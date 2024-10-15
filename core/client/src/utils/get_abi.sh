#! /bin/bash
 
# replace it with the network your contract lives on
NETWORK=testnet
# replace it with your contract address
CONTRACT_ADDRESS=0x0cf4bffccb2fda4d8bade961d03514d9daa06f2de0f43c8122ecbe1bbd6c9742
# replace it with your module name, every .move file except move script has module_address::module_name {}
MODULE_NAME=router
 
# save the ABI to a TypeScript file
echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CONTRACT_ADDRESS/module/$MODULE_NAME | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > abi.ts