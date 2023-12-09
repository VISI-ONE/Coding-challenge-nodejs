import { Request, Response } from "express";
import { Tenant } from "../../errors";
import { getPriceboards } from "../priceboard";
import { getById } from "./Model";

export default async function (req: Request, res: Response) {
    const tenantId = req.params.id;

    const tenant = await getById(tenantId);

    if (!tenant) {
        res.status(404).json({ message: Tenant.notFound });
        return;
    }

    const priceboards = await getPriceboards({ tenantId });
    res.status(200).json(priceboards);
};