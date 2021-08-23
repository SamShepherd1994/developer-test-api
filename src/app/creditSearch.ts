import { Request, Response } from 'express';
import API from "../api";

const api = new API();

export default async (req: Request, res: Response): Promise<void> => {

  // First get a list of all available addresses.
  const allAddresses = await api.getAddresses();

  // Find the specific address in the correct format.
  const address = allAddresses.find(address => {
    let addressJoined = address.address1;
    if (address.address2) {
      addressJoined += ` ${address.address2}`
    }
    return req.body.address === addressJoined && req.body.postcode === address.postcode
  });

  // Find all creditos associated with the surname and address
  const creditors = await api.filterCreditors(JSON.stringify({
    surname: req.body.surname,
    addressId: address?.id,
  }))

  // Perform calculations.
  let totalCreditorValue = 0;
  let securedCreditorValue = 0;
  let unsecuredCreditorValue = 0;
  let unsecuredCount = 0;
  let qualifies = false;
  creditors.forEach(creditor => {
    totalCreditorValue += creditor.value;
    if (creditor.secured) {
      securedCreditorValue += creditor.value;
    } else {
      unsecuredCreditorValue += creditor.value;
      unsecuredCount++;
    }

    if (unsecuredCount >= 2 && unsecuredCreditorValue >= 500000) {
      qualifies = true;
    }
  })

  res.send({
    totalCreditorValue,
    securedCreditorValue,
    unsecuredCreditorValue,
    qualifies
  }).end()
};
