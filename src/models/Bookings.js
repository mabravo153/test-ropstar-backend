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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Restorants_1 = __importDefault(require("./Restorants"));
let Bookings = class Bookings {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Bookings.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], Bookings.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Bookings.prototype, "customer_name", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Bookings.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Restorants_1.default, (restoran) => restoran.bookings),
    __metadata("design:type", Restorants_1.default)
], Bookings.prototype, "restoran", void 0);
Bookings = __decorate([
    typeorm_1.Entity()
], Bookings);
exports.default = Bookings;
//# sourceMappingURL=Bookings.js.map