import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import Database from "../config/database";
import Order, { IOrder } from "../models/Order";

export class OrdersRepository {
    private dbConnection: mongoose.Connection;

    constructor() {
        this.dbConnection = Database.getConnection()!;
    }

    async createOrder(data: IUser): Promise<IOrder> {
        return await Order.create(data);
    }

    async getAllOrders(): Promise<IOrder[]> {
        return await Order.find();
    }

    async getOrderById(id: string): Promise<IOrder | null> {
        return await Order.findById(id);
    }

    async getTotalRevenueByCategory(category: string): Promise<any> {
        return await Order.aggregate([
            {
                $match: {
                    "products.category": category
                }
            },
            { $unwind: "$products" },
            // {
            //     $group: {
            //         _id: "$products.category",
            //         totalRevenue: {
            //             $sum: {
            //                 $multiply: ["$products.price", "$products.quantity"]
            //             }
            //         },
            //     },
            // }
        ]);
    }
}
