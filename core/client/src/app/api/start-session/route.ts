import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { addr1, addr2 } = await request.json();

  if (!addr1) {
    return NextResponse.json({ error: 'First wallet address is required' }, { status: 400 });
  }

  const command = `aptos move run --function-id 0x2cdf1f17ef5a45e959140abc428ba14aa6d19a1923b2f440a699c04f1930da29::router::admin_prepare_short_game --args 'address:["${addr1}", "${addr2}"]' --url https://fullnode.testnet.aptoslabs.com/v1 --private-key-file /Users/maclay/Code/trust-16/core/client/src/app/api/start-session/public.key --assume-yes`;

  const exec = require('child_process').exec;

  return new Promise((resolve, reject) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        resolve(
          NextResponse.json({ error: 'Error executing script' }, { status: 500 })
        );
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve(NextResponse.json({ message: 'Script executed successfully', output: stdout }));
    });
  });
}
