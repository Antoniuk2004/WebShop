import { useEffect } from "react";
import { Props } from "./DataTypes";

function ApiRequest({dataProp, onDataChange}: Props, endPoint: string) {
    async function getData(endPoint: string): Promise<any> {
        try {
            const response = await fetch(`http://localhost:8800/api/${endPoint}`);
            const data: any = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async function processOrders() {
        try {
            const arrOfOrder: any = await getData(endPoint)
            return arrOfOrder
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    useEffect(() => {
        async function fetchAndProcessOrders() {
            try {
                const arrOfOrder: any = await processOrders();
                onDataChange(arrOfOrder);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAndProcessOrders();
    }, []);
}

export default ApiRequest