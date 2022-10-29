import { OnTransactionHandler } from '@metamask/snap-types';

// export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
//   return {
//     insights: {
//       something: 'something',
//     },
//   };
// };
exports.onTransaction = async ({ transaction }) => {
  const denylist =
    await // await fetch('https://e222-194-65-146-174.ngrok.io/api/blacklist')
    (await fetch('http://localhost:3001/api/blacklist')).json();
  const finalList = denylist
    .filter((address: any) => {
      return address.type === 'Wallet Address' || address.type === 'wallet';
    })
    .map((item: any) => {
      return item.address.toString().toLowerCase();
    });
  // console.log(transaction.to);
  return {
    insights: {
      'is this a phishing contract address?': finalList.includes(
        transaction.to.toString().toLowerCase(),
      ),
      // testing: JSON.stringify(transaction),
      // testing2: JSON.stringify(finalList),
      // testing3: JSON.stringify(denylist),
    },
  };
};
// import { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snap-types';

// /**
//  * Get a message from the origin. For demonstration purposes only.
//  *
//  * @param originString - The origin string.
//  * @returns A message based on the origin.
//  */
// export const getMessage = (originString: string): string =>
//   `Hello, ${originString}!`;

// /**
//  * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
//  *
//  * @param args - The request handler args as object.
//  * @param args.origin - The origin of the request, e.g., the website that
//  * invoked the snap.
//  * @param args.request - A validated JSON-RPC request object.
//  * @returns `null` if the request succeeded.
//  * @throws If the request method is not valid for this snap.
//  * @throws If the `snap_confirm` call failed.
//  */
// export const onTransaction: OnTransactionHandler = ({transaction}) => {

//   switch (request.method) {
//     case 'hello':
//       return wallet.request({
//         method: 'snap_confirm',
//         params: [
//           {
//             prompt: getMessage(origin),
//             description:
//               ' 2This custom confirmation is just for display purposes.',
//             textAreaContent:
//               '222But you can edit the snap source code to make it do something, if you want to!',
//           },
//         ],
//       });
//     default:
//       throw new Error('Method not found.');
//   }
// };
