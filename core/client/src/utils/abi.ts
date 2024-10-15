export const ABI = {"address":"0x1b70e6e213bfb725f372840f616b3b6339d5ef17c0cacb3fe9a6ca79be1afbfd","name":"router","friends":[],"exposed_functions":[{"name":"admin_prepare_short_game","visibility":"friend","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","vector<address>"],"return":[]},{"name":"admin_submit_pepper_and_finish_round","visibility":"friend","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","address","u64","vector<u8>"],"return":[]},{"name":"join_game","visibility":"friend","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","address"],"return":[]},{"name":"submit_decision","visibility":"friend","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","address","u64","vector<u8>"],"return":[]}],"structs":[{"name":"SessionCreated","is_native":false,"is_event":true,"abilities":["drop","store"],"generic_type_params":[],"fields":[{"name":"session_id","type":"address"},{"name":"game_type","type":"0x1::string::String"},{"name":"players","type":"vector<address>"}]}]} as const
