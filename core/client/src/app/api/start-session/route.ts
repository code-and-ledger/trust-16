import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { addr1, addr2 } = await request.json();

  if (!addr1) {
    return NextResponse.json({ error: 'First wallet address is required' }, { status: 400 });
  }

  const command = `aptos move run --function-id 0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::router::admin_prepare_short_game --args 'address:["${addr1}", "${addr2}"]' --url https://fullnode.testnet.aptoslabs.com/v1 --private-key-file /Users/maclay/Code/trust-16/core/client/src/app/api/start-session/public.key --assume-yes`;

  const exec = require('child_process').exec;

  return new Promise((resolve, reject) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        resolve(
          NextResponse.json({ 
            error: 'Error executing script', 
            details: error.message 
          }, { status: 500 })
        );
        return;
      }

      // Parse the stderr for the transaction URL or ID
      const txnUrlMatch = stderr.match(/Transaction submitted: (https:\/\/explorer\.aptoslabs\.com\/txn\/[a-zA-Z0-9]+)/);
      const txnIdMatch = stderr.match(/expected: ([a-zA-Z0-9]+)/);

      const txnUrl = txnUrlMatch ? txnUrlMatch[1] : null;
      const txnId = txnIdMatch ? txnIdMatch[1] : null;

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      // Send the parsed transaction URL or ID along with stdout/stderr in the response
      resolve(
        NextResponse.json({ 
          message: 'Script executed', 
          stdout: stdout, 
          stderr: stderr,
          transactionUrl: txnUrl,  // Return the transaction URL
          transactionId: txnId     // Return the transaction ID
        })
      );
    });
  });
}
