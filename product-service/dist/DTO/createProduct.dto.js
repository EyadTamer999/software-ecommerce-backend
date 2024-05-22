"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductDto = void 0;
const class_validator_1 = require("class-validator");
class CustomizationOptions {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CustomizationOptions.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CustomizationOptions.prototype, "colors", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CustomizationOptions.prototype, "materials", void 0);
class RentalOption {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RentalOption.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RentalOption.prototype, "price", void 0);
class Review {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Review.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Review.prototype, "review", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
class createProductDto {
    toString() {
        return JSON.stringify({
            name: this.name,
            description: this.description,
            images: this.images,
            price: this.price,
            availability: this.availability,
            stock: this.stock,
            specifications: this.specifications,
            customizationOptions: this.customizationOptions,
            rentalOptions: this.rentalOptions,
            reviews: this.reviews,
            relatedProducts: this.relatedProducts
        });
    }
}
exports.createProductDto = createProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], createProductDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], createProductDto.prototype, "availability", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], createProductDto.prototype, "specifications", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CustomizationOptions)
], createProductDto.prototype, "customizationOptions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], createProductDto.prototype, "rentalOptions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], createProductDto.prototype, "reviews", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], createProductDto.prototype, "relatedProducts", void 0);
//# sourceMappingURL=createProduct.dto.js.map