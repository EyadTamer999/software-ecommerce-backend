/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { decode } from 'jsonwebtoken';
import { Cron , CronExpression } from '@nestjs/schedule';
import { ClientKafka } from '@nestjs/microservices';
import { ISettings } from './interfaces/settings.interface';
import { DeliveryFees } from './interfaces/deliveryFees.interface'
import { PromoCode } from './interfaces/promoCode.interface'
import { MailerService } from '@nestjs-modules/mailer';
import { PayMobCreateOrderDTO } from './DTO/payment-order.dto';
import { CreateOrderDTO } from './DTO/createOrder.dto';


const mapOrderItems = (items) => {
  return items.map(item => ({
      name: item.name,
      quantity: parseInt(item.quantity, 10),
      size: item.size,
      material: item.material,
      amount_cents: item.price *100, // Assuming price is same as amount_cents
      description: item.description
  }));
};
@Injectable()
export class AppService {
  
 constructor(@Inject('USER_SERVICE') private userClient: ClientKafka , @Inject('ORDER_MODEL') private orderModel: Model<Order> , 
  @Inject('SETTINGS_MODEL') private settingsModel:Model<ISettings>, @Inject('DELIVERY_FEES_MODEL') private deliveryFeesModel:Model<DeliveryFees>,
  @Inject('PROMO_CODE_MODEL') private promoCodeModel: Model<PromoCode>, private readonly mailerService: MailerService ,
  @Inject('PRODUCT_SERVICE') private productClient: ClientKafka ,@Inject('PAYMENT_SERVICE') private paymentClient: ClientKafka ){

  this.userClient.subscribeToResponseOf('user_findByEmail');
  this.userClient.subscribeToResponseOf('update-user');
  this.userClient.subscribeToResponseOf('Get-all-Admins');
  this.userClient.subscribeToResponseOf('Get-All-Users');

  this.productClient.subscribeToResponseOf('Get_product_For_Order')
  this.productClient.subscribeToResponseOf('updateProductQuantity')
  
  this.paymentClient.subscribeToResponseOf('paymob_payment_key')

 }

 private async sendMail(email: string, link: string , subject :string , body:string , html : string ): Promise<any> {
    
  return   this.mailerService.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: subject,
    text: body,
    html: html,
  }).then(() => {
    console.log('Email sent');
  })
  .catch((e) => {
    console.log('Error sending email', e);
  });

 
}

 private async getUserByToken(jwtToken: string) {
  const paylod = decode(jwtToken);
  // console.log('Payload:', paylod['user']);
  const email = paylod['email'];
  const data = await this.userClient.send('user_findByEmail' , email).toPromise();
  const user = data.user
  
  return user;
  
}

async updateProductQuantity(createOrderDto: CreateOrderDTO, jwtToken: string): Promise<any> {
  try{
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    const Order = {
      ...createOrderDto,
      user: user._id,
    }


    const newOrder = new this.orderModel(Order);
    
    Order.orderItems.forEach(async (item) => {
      const productId = item.productId;
      const quantity = item.quantity;
      console.log('productId', productId)
      await this.productClient.send('updateProductQuantity' , {productId , quantity}).toPromise();
    }
  );

  const promocodeused = this.promoCodeModel.findOneAndUpdate({code : Order.couponCode} , { $push: { usersUsed: user._id } })
  console.log('promocodeused' , promocodeused)

   
  user.cart = [];

  await this.userClient.send('update-user' , user).toPromise();
  
  await newOrder.save();
    return { message: 'Product quantity updated successfully' };    
  }catch(error){
    throw new Error(error.message)
  }
}

  // async updateProductQuantity(order: any ,jwtToken: string): Promise<any> {
 
  
  // }


  async createOrder(order: any ,jwtToken: string): Promise<any> {
    console.log('Order created: ', order);
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }

    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    

    //const Dto = new PayMobCreateOrderDTO();
    order.orderItems.forEach(async (item) => {
      const data = await this.productClient.send('Get_product_For_Order' , item.productId).toPromise();
      console.log('Product from create order: ', data.product);
      const product = data.product;
      if(product.stock < item.quantity){
        return { message: item.productId + ' item quantity bigger than stock' };
      }

      
      // front 3ashan n3mel display ll price ll user b3den nbseha ll order b3d el t8yer:

      // if(item.rent === true){
      //   item.price = product.rentPrice * item.rent_duration;
      // }else{
      //   item.price = product.buyPrice;
      // }
      // if(item.color){
      //   item.price += 10;
      // }
      // if(item.size === "medium"){
      //   item.price += 10;
      // }
      // if(item.size === "large"){
      //   item.price += 20;
      // }

      // if(item.material === "plastic"){
      //   item.price += 20;
      // }
      // if(item.material === "wood"){
      //   item.price += 30;
      // }
      // if(item.material === "metal"){
      //   item.price += 40;
      // }

      // if(product.discount){
      //   item.price -= (item.price * product.discount / 100);
      // }



      // order.totalPrice += item.price;
    }
    );

    

    // const feesForDelivery = await this.deliveryFeesModel.findOne({ city: order.shippingAddress.state }); 

    // order.totalPrice += feesForDelivery.deliveryFees;


    // console.log('User from create order: ', user);
    // i will check on product quantity here  
    // check what user choosed to rent or to buy 
    // calculate the total price of the order + tax + delivery fees
    // calculate the delivery fees based on the address( region )

    // call the payment service to make the payment
    const data = mapOrderItems(order.orderItems);

    const test = {
      "delivery_needed": "true",
      "amount_cents": order.totalPrice *100,
      "currency": "EGP",
      "items": data , 
      "shipping_data": {
        "apartment": order.shippingAddress.appartment, 
        "email": user.email, 
        "floor": order.shippingAddress.floor, 
        "first_name": user.FirstName, 
        "street": order.shippingAddress.street, 
        "building": order.shippingAddress.building, 
        "phone_number": user.phone, 
        "postal_code": order.shippingAddress.postalcode, 
         "extra_description": order.shippingAddress.extra_description,
        "city": order.shippingAddress.city, 
        "country": order.shippingAddress.country, 
        "last_name": user.LastName, 
        "state": order.shippingAddress.state
      }
    }
    
    const paymentKey = await this.paymentClient.send('paymob_payment_key' , test ).toPromise();

    if(!paymentKey){
      return {message: 'error in payment '}
    }

    // b3d el payment i will update the product quantity in database
    // const Order = {
    //   ...order,
    //   user: user._id,
    // }

    // const newOrder = new this.orderModel(Order);
    // await newOrder.save();
    return { message: 'Order created successfully', link : paymentKey.iframe_url , order: order};

  }

  async getOrdersHistory(jwtToken: string): Promise<any> { 
    // console.log('jwtToken from get orders history:', jwtToken);
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    console.log('User from get orders history: ', user._id);
    const orders = await this.orderModel.find({ 
      user: user._id, 
      orderStatus: { $in: ['pending' ,'closed', 'cancelled' , 'open'] }
    });
    
    console.log("------------->" ,orders)
    if(orders.length === 0 ){
      return {message : 'No order History'}
    }
    return { message: 'Orders retrieved successfully', orders };
  }

  async getOrder( id: string , jwtToken: string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    // console.log('User from get order: ', user);

    const order = await this.orderModel.findOne({ _id: id , user: user._id});
    if (!order) {
      return { message: 'Order not found' };
    }
    return { message: 'Order retrieved successfully', order };
  }

  async cancelOrder(id: string , jwtToken: string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    if(user.Verification === false){
      return { message: 'User not verified' };
    }
    // console.log('User from cancel order: ', user);

    const order = await this.orderModel.findOne({ _id: id , user: user._id});
    if (!order) {
      return { message: 'Order not found' };
    }

    if(order.orderStatus === 'closed' || order.orderStatus === 'cancelled'){
      return { message: 'Order already closed' };
    }

    //if now is two days after the order date i will not allow the user to cancel the order
    const orderDate = order.createdAt;
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays > 2){
      return { message: 'You can not cancel the order now 2 days passed' };
    }


    order.orderStatus = 'cancelled';
    order.deliveryStatus = 'cancelled';
    await order.save();
    return { message: 'Order cancelled successfully', order };
  }


  //admin-----------------------
  async getOrderQueue(jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from get order queue: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to get the order queue' };
    }

    //get the orders from the order model that are in the queue
    const orders = await this.orderModel.find({ _id: admin.ordersQueue});

    
    return { message: 'Order queue retrieved successfully', orders};
  }

  async getAllOrders(jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from get all orders: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to get all orders' };
    }

    const orders = await this.orderModel.find();
    return { message: 'Orders retrieved successfully', orders };
  }

  async updateOrderStatus(id: string , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from update order status: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to update the order status' };
    }

    const order = await this.orderModel.findOne({ _id: id});
    if (!order) {
      return { message: 'Order not found' };
    }
    if(order.orderStatus === 'closed' || order.orderStatus === 'cancelled'){
      return { message: 'Order already closed' };
    }
    if(order.orderStatus === 'pending'){
      return { message: 'order is pending state' };
    }
    
    
    if(!admin.ordersQueue.includes(id)){
      return { message: 'You are not authorized to update the order status waite for the system to update your queue' };
    }

    order.orderStatus = 'pending';
    order.deliveryStatus = 'pending';
    await order.save();



    return { message: 'Order status updated successfully', order };
  }

  async updateOrderStatusClosed(id: string , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from update order status closed: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to update the order status' };
    }

    const order = await this.orderModel.findOne({ _id: id});
    if (!order) {
      return { message: 'Order not found' };
    }
    
    
    if(order.orderStatus === 'closed' || order.orderStatus === 'cancelled'){
      return { message: 'Order already closed' };
    }

    if(!admin.ordersQueue.includes(id)){
      return { message: 'You are not authorized to update the order status waite for the system to update your queue' };
    }

    order.orderStatus = 'closed';
    order.deliveryStatus = 'delivered';
    await order.save();

    //remove the order from the queue
    // const index = admin.ordersQueue.indexOf(id);
    // if (index > -1) {
    //   admin.ordersQueue.splice(index, 1);
    // }
    admin.ordersQueue = admin.ordersQueue.filter(orderId => orderId !== id);
     await this.userClient.send('update-user' , admin).toPromise();                          
    


    return { message: 'Order status closed successfully', order };
  }

  async addDeliveryFee(createDeliveryFeeDTO: any , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from add delivery fee: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to add delivery fee' };
    }

     const { deliveryFees, city } = createDeliveryFeeDTO;

     const NewdeliveryFee = await this.deliveryFeesModel.findOneAndUpdate(
      { city },
      { $set: { deliveryFees } },
      { 
        new: true, 
        upsert: true 
      }
    );
  
    return { message: 'Delivery fee added successfully' ,NewdeliveryFee };
  }

  async deleteDeliveryFee(id: string , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from delete delivery fee: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to delete delivery fee' };
    }
    console.log('id from delete delivery fee:', id);
    const deliveryFee = await this.deliveryFeesModel.findByIdAndDelete({ _id: id});
    console.log('id from delete delivery fee:', id);
    if (!deliveryFee) {
      return { message: 'Delivery fee not found' };
    }

    return { message: 'Delivery fee deleted successfully' };
  }

  async getDeliveryFee(): Promise<any> {
    const deliveryFees = await this.deliveryFeesModel.find();
    return { message: 'Delivery fees retrieved successfully', deliveryFees };
  }

  async addPromoCode(createPromoCodeDTO: any , jwtToken: string): Promise<any> {
    const admin = await this.getUserByToken(jwtToken);
    if (!admin) {
      return { message: 'User not found' };
    }
    // console.log('User from add promo code: ', user);

    if(admin.role !== 'admin'){
      return { message: 'You are not authorized to add promo code' };
    }

    const { code, discount, expiryDate } = createPromoCodeDTO;
    const NewPromoCode = await this.promoCodeModel.findOneAndUpdate(
      { code },
      { discount, expiryDate },
      {
        new: true,      // Return the updated document
        upsert: true    // Create a new document if no document matches the filter
      }
    );

    //send the promoCode to all users by email
    const data = await this.userClient.send('Get-All-Users' , {}).toPromise();
    const users = data.users;

    //make the expiryDate in a readable format
    const date = new Date(expiryDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    

    
    users.forEach(async user => {
      const expiryDateStr = `${day}/${month}/${year}`;
      const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .header {
          text-align: center;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .header h1 {
          margin: 0;
          color: #4CAF50;
        }
        .content {
          padding: 20px;
        }
        .promo-code {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        .discount {
          font-size: 20px;
          color: #4CAF50;
        }
        .expiry-date {
          font-size: 16px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Promo Code</h1>
        </div>
        <div class="content">
          <p>Dear ${user.FirstName},</p>
          <p>We are excited to offer you a new promo code:</p>
          <p class="promo-code">${code}</p>
          <p class="discount">Discount: ${discount}%</p>
          <p class="expiry-date">Expiry Date: ${expiryDateStr}</p>
          <p>Don't miss out on this great offer!</p>
          <p>Best regards,<br>Paleta plastic 2w 5ashab</p>
        </div>
      </div>
    </body>
    </html>
  `;

      await this.sendMail(user.email, code , 'New Promo Code' , 'New Promo Code' , htmlContent);
      
    });


    return { message: 'Promo code added successfully' };
  }


  async getPromoCode(promocode: string , jwtToken: string): Promise<any> {
    const user = await this.getUserByToken(jwtToken);
    if (!user) {
      return { message: 'User not found' };
    }
    console.log("promocode -------->" , promocode)
    const promoCode = await this.promoCodeModel.findOne({ code: promocode['promocode'] });
    if (!promoCode) {
      return { success : false , message: 'Promo code not found'};
    }
    console.log(promoCode)
    return { success: true , discount : promoCode.discount} ;
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM) // You can change this to your desired cron expression
  private async updateQueue() {
    try {
      // Get all admin users
      const data = await this.userClient.send('Get-all-Admins', {}).toPromise();
      const admins = data.Admins;
      
      if (admins.length === 0) {
        console.log('No admins found');
        return;
      }
  
      // Retrieve the last assigned admin index from the settings
      const lastAssignedSetting = await this.settingsModel.findOne({ name: 'lastAssignedAdminIndex' });
  
      // Initialize the last assigned admin index if not already present
      let lastAssignedAdminIndex = lastAssignedSetting ? lastAssignedSetting.value : 0;
  
      // Get the current date
      const currentDate = new Date();
  
      // Find all orders with status 'open'
      const orders = await this.orderModel.find({ orderStatus: 'open' });
  
      // Filter orders that need to be added
      const ordersToAdd = orders.filter(order => {
        const orderDate = new Date(order.createdAt); // Ensure orderDate is a Date object
        const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 2; // Check if order is bigger than 2 days
      });
  
      if (ordersToAdd.length === 0) {
        console.log('No new orders to add to the queue');
        return;
      }
  
      // Gather all currently assigned order IDs to avoid duplicate assignments
      const assignedOrderIds = new Set<string>();
      admins.forEach(admin => {
        admin.ordersQueue.forEach(orderId => assignedOrderIds.add(String(orderId)));
      });
  
      // Round-robin distribution of orders
      for (const order of ordersToAdd) {
        let assigned = false;
        let attempts = 0; // Track the number of attempts to avoid infinite loops
  
        // Check if the order is already assigned
        const orderIdString = String(order._id);
        if (assignedOrderIds.has(orderIdString)) {
          continue; // Skip this order if it's already assigned
        }
  
        // Loop through admins to find the next admin who does not have the order
        while (!assigned && attempts < admins.length) {
          const admin = admins[lastAssignedAdminIndex];
  
          // Convert admin.ordersQueue elements to strings for comparison
          const orderQueueIds = admin.ordersQueue.map(id => String(id));
  
          if (!orderQueueIds.includes(orderIdString)) {
            admin.ordersQueue.push(order._id);
            await this.userClient.send('update-user', admin).toPromise(); //admin.save();
            assigned = true;
            assignedOrderIds.add(orderIdString); // Mark the order as assigned
          }
  
          // Move to the next admin in a round-robin fashion
          lastAssignedAdminIndex = (lastAssignedAdminIndex + 1) % admins.length;
          attempts++; // Increment the number of attempts
        }
  
        if (!assigned) {
          console.log(`Order ${order._id} could not be assigned to any admin`);
        }
      }
  
      // Save the updated last assigned admin index to the settings
      await this.settingsModel.updateOne(
        { name: 'lastAssignedAdminIndex' },
        { $set: { value: lastAssignedAdminIndex } },
        { upsert: true }
      );
  
      console.log('Cron job completed....');
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }

}
