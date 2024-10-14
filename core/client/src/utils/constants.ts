export const TRUST_16_MAINNET = process.env.NEXT_PUBLIC_TRUST_16_MAINNET || '';
export const TRUST_16_TESTNET = process.env.NEXT_PUBLIC_TRUST_16_TESTNET || '';
export const APTOS_FRAMEWORK = process.env.APTOS_FRAMEWORK || '';

const IS_MAINNET = process.env.NODE_ENV === 'production'; // or use any other condition to differentiate
const SELECTED_TRUST_16_ADDRESS = IS_MAINNET ? TRUST_16_MAINNET : TRUST_16_TESTNET;


export const MODULE_NAMES = {
    ROUTER: 'router',
    UTILS: 'utils',
    TRUST_COIN: 'trust_coin',
    MECHANICS: 'mechanics',
    REWARDS_POOL: 'rewards_pool',
    SESSION: 'session',
    SHORT_GAME: 'short_game',
    // aptos framework
    RANDOMNESS: 'randomness',
}

export const FUNCTION_NAMES = {
    // router
    ADMIN_PREPARE_SHORT_GAME: 'admin_prepare_short_game',
    JOIN_GAME: 'join_game',
    SUBMIT_DECISION: 'submit_decision',
    ADMIN_SUBMIT_PEPPER_AND_FINISH_ROUND: 'admin_submit_pepper_and_finish_round',
    // utils
    HASHED_COOPERATE: 'hashed_cooperate',
    HASHED_COMPETE: 'hashed_compete',
    GENERATE_U256_IN_RANGE: 'generate_u256_in_range',
    // trust_coin
    BURN: 'burn',
    ADMIN_ADD_TO_DENYLIST: 'admin_add_to_denylist',
    ADMIN_ADD_ALL_TO_DENYLIST: 'admin_add_all_to_denylist',
    ADMIN_REMOVE_FROM_DENYLIST: 'admin_remove_from_denylist',
    ADMIN_REMOVE_ALL_FROM_DENYLIST: 'admin_remove_all_from_denylist',
    ADMIN_ADD_LIMITED_EXCHANGE_ENTRY: 'admin_add_limited_exchange_entry',
    ADMIN_ADD_DEFAULT_EXCHANGE_ENTRY: 'admin_add_default_exchange_entry',
    COIN_ADDRESS: 'coin_address',
    METADATA: 'metadata',
    MINT_OBJ_ADDR: 'mint_obj_addr',
    WITHDRAW_OBJ_ADDR: 'withdraw_obj_addr',
    // mechanics
    GAME_TYPE: 'game_type',
    ROUND_START_TIME: 'round_start_time',
    ROUND_DURATION: 'round_duration',
    ROUND_HASHED_DECISIONS_MAP: 'round_hashed_decisions_map',
    PLAYER_ROUND_DEPOSIT_AMOUNT: 'player_round_deposit_amount',
    ROUND_DEPOSIT_AMOUNT: 'round_deposit_amount',
    ROUND_TOTAL_PLAYERS_DEPOSIT_AMOUNT: 'round_total_players_deposit_amount',
    ROUND_REWARDS_POOL_DEPOSIT_AMOUNT: 'round_rewards_pool_deposit_amount',
    TOTAL_IN_ROUND_REWARDS: 'total_in_round_rewards',
    GAME_IS_ACTIVE: 'is_active',
    ARE_ALL_DECISIONS_SUBMITTED: 'are_all_decisions_submitted',
    REVEAL_DECISIONS_IN_ROUND: 'reveal_decisions_in_round',
    IS_FIRST_DECISION_IN_ROUND: 'is_first_decision_in_round',
    IS_LAST_DECISION_IN_ROUND: 'is_last_decision_in_round',
    LIVE_ROUND_INDEX: 'live_round_index',
    ROUNDS_COUNT: 'rounds_count',
    HASHED_DECISION: 'hashed_decision',
    // rewards_pool
    POOL_STORE_OBJECT: 'pool_store_object',
    POOL_ADDRESS: 'pool_address',
    // session
    SESSION_EXISTS: 'session_exists',
    HAS_ACTIVE_SESSION: 'has_active_session',
    ACTIVE_SESSION_ID: 'active_session_id',
    PLAYER_IS_IN_SESSION: 'player_is_in_session',
    SESSION_IS_ACTIVE: 'is_active',
    PLAYERS: 'players',
    // short_game
    PLAYERS_COUNT: 'players_count',
    SHORT_GAME_ROUNDS_COUNT: 'rounds_count',
    SHORT_GAME_ROUND_DURATION: 'round_duration',
    // aptos framework
    // TODO: add the needed functions here
}

export const EVENTS_NAMES = {
    // router
    SESSION_CREATED: 'SessionCreated',
}

export const ENDPOINTS = {
    [MODULE_NAMES.ROUTER]: {
        // functions
        ADMIN_PREPARE_SHORT_GAME: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_PREPARE_SHORT_GAME}`,
        JOIN_GAME: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.JOIN_GAME}`,
        SUBMIT_DECISION: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.SUBMIT_DECISION}`,
        SUBMIT_PEPPER_AND_FINISH_ROUND: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_SUBMIT_PEPPER_AND_FINISH_ROUND}`,
        // events
        SESSION_CREATED: `${SELECTED_TRUST_16_ADDRESS}::${EVENTS_NAMES.SESSION_CREATED}`,
    },
    [MODULE_NAMES.UTILS]: {
        HASHED_COOPERATE: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.HASHED_COOPERATE}`,
        HASHED_COMPETE: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.HASHED_COMPETE}`,
        GENERATE_U256_IN_RANGE: `${APTOS_FRAMEWORK}::${FUNCTION_NAMES.GENERATE_U256_IN_RANGE}`,
    },
    [MODULE_NAMES.TRUST_COIN]: {
        BURN: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.BURN}`,
        ADD_TO_DENYLIST: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_ADD_TO_DENYLIST}`,
        ADD_ALL_TO_DENYLIST: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_ADD_ALL_TO_DENYLIST}`,
        REMOVE_FROM_DENYLIST: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_REMOVE_FROM_DENYLIST}`,
        REMOVE_ALL_FROM_DENYLIST: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_REMOVE_ALL_FROM_DENYLIST}`,
        ADD_LIMITED_EXCHANGE_ENTRY: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_ADD_LIMITED_EXCHANGE_ENTRY}`,
        ADD_DEFAULT_EXCHANGE_ENTRY: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ADMIN_ADD_DEFAULT_EXCHANGE_ENTRY}`,
        COIN_ADDRESS: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.COIN_ADDRESS}`,
        METADATA: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.METADATA}`,
        MINT_OBJ_ADDR: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.MINT_OBJ_ADDR}`,
        WITHDRAW_OBJ_ADDR: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.WITHDRAW_OBJ_ADDR}`,
    },
    [MODULE_NAMES.MECHANICS]: {
        GAME_TYPE: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.GAME_TYPE}`,
        ROUND_START_TIME: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUND_START_TIME}`,
        ROUND_DURATION: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUND_DURATION}`,
        ROUND_HASHED_DECISIONS_MAP: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUND_HASHED_DECISIONS_MAP}`,
        PLAYER_ROUND_DEPOSIT_AMOUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.PLAYER_ROUND_DEPOSIT_AMOUNT}`,
        ROUND_DEPOSIT_AMOUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUND_DEPOSIT_AMOUNT}`,
        ROUND_TOTAL_PLAYERS_DEPOSIT_AMOUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUND_TOTAL_PLAYERS_DEPOSIT_AMOUNT}`,
        ROUND_REWARDS_POOL_DEPOSIT_AMOUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUND_REWARDS_POOL_DEPOSIT_AMOUNT}`,
        TOTAL_IN_ROUND_REWARDS: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.TOTAL_IN_ROUND_REWARDS}`,
        GAME_IS_ACTIVE: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.GAME_IS_ACTIVE}`,
        ARE_ALL_DECISIONS_SUBMITTED: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ARE_ALL_DECISIONS_SUBMITTED}`,
        REVEAL_DECISIONS_IN_ROUND: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.REVEAL_DECISIONS_IN_ROUND}`,
        IS_FIRST_DECISION_IN_ROUND: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.IS_FIRST_DECISION_IN_ROUND}`,
        IS_LAST_DECISION_IN_ROUND: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.IS_LAST_DECISION_IN_ROUND}`,
        LIVE_ROUND_INDEX: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.LIVE_ROUND_INDEX}`,
        ROUNDS_COUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ROUNDS_COUNT}`,
        HASHED_DECISION: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.HASHED_DECISION}`,
    },
    [MODULE_NAMES.REWARDS_POOL]: {
        POOL_STORE_OBJECT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.POOL_STORE_OBJECT}`,
        POOL_ADDRESS: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.POOL_ADDRESS}`,
    },
    [MODULE_NAMES.SESSION]: {
        SESSION_EXISTS: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.SESSION_EXISTS}`,
        HAS_ACTIVE_SESSION: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.HAS_ACTIVE_SESSION}`,
        ACTIVE_SESSION_ID: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.ACTIVE_SESSION_ID}`,
        PLAYER_IS_IN_SESSION: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.PLAYER_IS_IN_SESSION}`,
        SESSION_IS_ACTIVE: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.SESSION_IS_ACTIVE}`,
        PLAYERS: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.PLAYERS}`,
    },
    [MODULE_NAMES.SHORT_GAME]: {
        PLAYERS_COUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.PLAYERS_COUNT}`,
        ROUNDS_COUNT: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.SHORT_GAME_ROUNDS_COUNT}`,
        ROUND_DURATION: `${SELECTED_TRUST_16_ADDRESS}::${FUNCTION_NAMES.SHORT_GAME_ROUND_DURATION}`,
    },

}
