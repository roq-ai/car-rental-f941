import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { vehicleUsageValidationSchema } from 'validationSchema/vehicle-usages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.vehicle_usage
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVehicleUsageById();
    case 'PUT':
      return updateVehicleUsageById();
    case 'DELETE':
      return deleteVehicleUsageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVehicleUsageById() {
    const data = await prisma.vehicle_usage.findFirst(convertQueryToPrismaUtil(req.query, 'vehicle_usage'));
    return res.status(200).json(data);
  }

  async function updateVehicleUsageById() {
    await vehicleUsageValidationSchema.validate(req.body);
    const data = await prisma.vehicle_usage.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVehicleUsageById() {
    const data = await prisma.vehicle_usage.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
