
<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics"></a>

# Module `0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::mechanics`



-  [Resource `GameInfo`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_GameInfo)
-  [Resource `Round`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_Round)
-  [Struct `DescisionSubmitted`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_DescisionSubmitted)
-  [Struct `PepperSubmitted`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_PepperSubmitted)
-  [Constants](#@Constants_0)
-  [Function `assert_round_valid`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_assert_round_valid)
-  [Function `prepare_game`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_prepare_game)
-  [Function `start_game`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_start_game)
-  [Function `join_game`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_join_game)
-  [Function `finish_game`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_finish_game)
-  [Function `submit_decision`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_submit_decision)
-  [Function `submit_pepper`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_submit_pepper)
-  [Function `finish_round`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_finish_round)
-  [Function `game_type`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_game_type)
-  [Function `round_start_time`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_start_time)
-  [Function `round_duration`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_duration)
-  [Function `round_hashed_decisions_map`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_hashed_decisions_map)
-  [Function `player_round_deposit_amount`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_player_round_deposit_amount)
-  [Function `round_deposit_amount`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_deposit_amount)
-  [Function `round_total_players_deposit_amount`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_total_players_deposit_amount)
-  [Function `round_rewards_pool_deposit_amount`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_rewards_pool_deposit_amount)
-  [Function `total_in_round_rewards`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_total_in_round_rewards)
-  [Function `is_active`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_active)
-  [Function `are_all_decisions_submitted`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_are_all_decisions_submitted)
-  [Function `reveal_decisions_in_round`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_reveal_decisions_in_round)
-  [Function `is_first_decision_in_round`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_first_decision_in_round)
-  [Function `is_last_decision_in_round`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_last_decision_in_round)
-  [Function `live_round_index`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_live_round_index)
-  [Function `rounds_count`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_rounds_count)
-  [Function `hashed_decision`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_hashed_decision)


<pre><code><b>use</b> <a href="">0x1::event</a>;
<b>use</b> <a href="">0x1::fungible_asset</a>;
<b>use</b> <a href="">0x1::object</a>;
<b>use</b> <a href="">0x1::option</a>;
<b>use</b> <a href="">0x1::signer</a>;
<b>use</b> <a href="">0x1::simple_map</a>;
<b>use</b> <a href="">0x1::smart_table</a>;
<b>use</b> <a href="">0x1::timestamp</a>;
<b>use</b> <a href="">0x1::type_info</a>;
<b>use</b> <a href="">0x1::vector</a>;
<b>use</b> <a href="">0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98::trust_coin</a>;
<b>use</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool">0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::rewards_pool</a>;
<b>use</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session">0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::session</a>;
<b>use</b> <a href="utils.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_utils">0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::utils</a>;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_GameInfo"></a>

## Resource `GameInfo`

Global storage for the game data


<pre><code><b>struct</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_GameInfo">GameInfo</a> <b>has</b> key
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_Round"></a>

## Resource `Round`

Global storage for the round data


<pre><code><b>struct</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_Round">Round</a> <b>has</b> store, key
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_DescisionSubmitted"></a>

## Struct `DescisionSubmitted`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_DescisionSubmitted">DescisionSubmitted</a> <b>has</b> drop, store
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_PepperSubmitted"></a>

## Struct `PepperSubmitted`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_PepperSubmitted">PepperSubmitted</a> <b>has</b> drop, store
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EDECSION_ALREADY_SUBMITTED"></a>

You already submitted a decision


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EDECSION_ALREADY_SUBMITTED">EDECSION_ALREADY_SUBMITTED</a>: u64 = 3;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EGAME_NOT_FINISHED"></a>

The game is not finished yet


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EGAME_NOT_FINISHED">EGAME_NOT_FINISHED</a>: u64 = 7;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_ELENGTH_MISMATCH"></a>

The length of the input vector is not as expected


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_ELENGTH_MISMATCH">ELENGTH_MISMATCH</a>: u64 = 1;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_ENOT_ALL_SUBMITTED"></a>

Not all players have submitted their decisions


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_ENOT_ALL_SUBMITTED">ENOT_ALL_SUBMITTED</a>: u64 = 4;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EPEPPER_SUBMITTED"></a>

The pepper is already submitted


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EPEPPER_SUBMITTED">EPEPPER_SUBMITTED</a>: u64 = 5;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EROUND_INVALID"></a>

The round index is invalid


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_EROUND_INVALID">EROUND_INVALID</a>: u64 = 2;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_E_HASH_MISMATCH"></a>

Hash mismatch


<pre><code><b>const</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_E_HASH_MISMATCH">E_HASH_MISMATCH</a>: u64 = 6;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_assert_round_valid"></a>

## Function `assert_round_valid`

Ensure round is valid:
- given round index is equal to the current round index
- the current time is within the round duration


<pre><code><b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_assert_round_valid">assert_round_valid</a>(session_id: <b>address</b>, round_index: u64)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_prepare_game"></a>

## Function `prepare_game`

Creates the game for matchmaking
Returns the session id


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_prepare_game">prepare_game</a>(type: <a href="_TypeInfo">type_info::TypeInfo</a>, players: <a href="">vector</a>&lt;<b>address</b>&gt;, rounds_count: u64, rounds_durations: <a href="">vector</a>&lt;u64&gt;): <b>address</b>
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_start_game"></a>

## Function `start_game`

Start the game
Triggered when all players have joined the game


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_start_game">start_game</a>(session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_join_game"></a>

## Function `join_game`

Join the game


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_join_game">join_game</a>(signer_ref: &<a href="">signer</a>, session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_finish_game"></a>

## Function `finish_game`

Finish the game and distribute the rewards
Triggered when the last round is finished
1. ensure the current round is the last round
2. ensure the current round is finished
3. distribute the rewards
4. end session


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_finish_game">finish_game</a>(session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_submit_decision"></a>

## Function `submit_decision`

Submit the decision


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_submit_decision">submit_decision</a>(signer_ref: &<a href="">signer</a>, session_id: <b>address</b>, round_index: u64, decision: <a href="">vector</a>&lt;u8&gt;)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_submit_pepper"></a>

## Function `submit_pepper`

Submit pepper; callable by the system
Triggered by the system when all addresses have submitted their decisions


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_submit_pepper">submit_pepper</a>(session_id: <b>address</b>, round_index: u64, pepper: <a href="">vector</a>&lt;u8&gt;)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_finish_round"></a>

## Function `finish_round`

Finish the round
Triggered when submit_last_decision is called
1. add hash_key to the Round resource via submit_pepper
2. update in-round balances tracker and append them to the balances tracker from game info


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_finish_round">finish_round</a>(session_id: <b>address</b>, round_index: u64)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_game_type"></a>

## Function `game_type`

Helper function to get the game type


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_game_type">game_type</a>(session_id: <b>address</b>): <a href="_TypeInfo">type_info::TypeInfo</a>
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_start_time"></a>

## Function `round_start_time`

Helper function to get the start time of a round at a given index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_start_time">round_start_time</a>(session_id: <b>address</b>, round_index: u64): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_duration"></a>

## Function `round_duration`

Helper function to get the duration of a round at a given index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_duration">round_duration</a>(session_id: <b>address</b>, round_index: u64): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_hashed_decisions_map"></a>

## Function `round_hashed_decisions_map`

Helper function to get the decisions of a round at a given index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_hashed_decisions_map">round_hashed_decisions_map</a>(session_id: <b>address</b>, round_index: u64): <a href="_SimpleMap">simple_map::SimpleMap</a>&lt;<b>address</b>, <a href="">vector</a>&lt;u8&gt;&gt;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_player_round_deposit_amount"></a>

## Function `player_round_deposit_amount`

Helper function to calculate the round deposit amount per player
initial_balances[player] / rounds_count (can query at index 1 or up, since index 0 is the balance from universal reward pool)


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_player_round_deposit_amount">player_round_deposit_amount</a>(session_id: <b>address</b>, player_addr: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_deposit_amount"></a>

## Function `round_deposit_amount`

Helper function to calculate the round deposit amount assuming all players have the same deposit amount
initial_balances[any_player] / rounds_count


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_deposit_amount">round_deposit_amount</a>(session_id: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_total_players_deposit_amount"></a>

## Function `round_total_players_deposit_amount`

Helper function to return all the players' deposit amounts in round


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_total_players_deposit_amount">round_total_players_deposit_amount</a>(session_id: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_rewards_pool_deposit_amount"></a>

## Function `round_rewards_pool_deposit_amount`

Helper function to calculate the round deposit amount from the universal reward pool
should be equal to the total total_deposit_amounts from players


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_round_rewards_pool_deposit_amount">round_rewards_pool_deposit_amount</a>(session_id: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_total_in_round_rewards"></a>

## Function `total_in_round_rewards`

Helper function to calculate the total in-round rewards
total_in_round_rewards = round_deposit_amount * players_count + round_rewards_pool_deposit_amount


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_total_in_round_rewards">total_in_round_rewards</a>(session_id: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_active"></a>

## Function `is_active`

Helper function to check whether the round is active
active if the current time is within the round duration


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_active">is_active</a>(session_id: <b>address</b>, round_index: u64): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_are_all_decisions_submitted"></a>

## Function `are_all_decisions_submitted`

Helper function to check whether all participants have submitted their decisions at a given round index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_are_all_decisions_submitted">are_all_decisions_submitted</a>(session_id: <b>address</b>, round_index: u64): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_reveal_decisions_in_round"></a>

## Function `reveal_decisions_in_round`

Helper function to reveal the decisions


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_reveal_decisions_in_round">reveal_decisions_in_round</a>(session_id: <b>address</b>, round_index: u64): <a href="_SimpleMap">simple_map::SimpleMap</a>&lt;<b>address</b>, bool&gt;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_first_decision_in_round"></a>

## Function `is_first_decision_in_round`

Helper function to check if the first submitter in the round at a given index has submitted a decision


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_first_decision_in_round">is_first_decision_in_round</a>(session_id: <b>address</b>, round_index: u64): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_last_decision_in_round"></a>

## Function `is_last_decision_in_round`

Helper function to check if submitter is the last submitter in the round at a given index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_is_last_decision_in_round">is_last_decision_in_round</a>(session_id: <b>address</b>, round_index: u64): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_live_round_index"></a>

## Function `live_round_index`

Returns the current round index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_live_round_index">live_round_index</a>(session_id: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_rounds_count"></a>

## Function `rounds_count`

Helper function to get the number of rounds in the game given a session id


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_rounds_count">rounds_count</a>(session_id: <b>address</b>): u64
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_hashed_decision"></a>

## Function `hashed_decision`

Returns the hashed decision of the player at a given round index


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics_hashed_decision">hashed_decision</a>(session_id: <b>address</b>, round_index: u64, player_addr: <b>address</b>): <a href="">vector</a>&lt;u8&gt;
</code></pre>
