
<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session"></a>

# Module `0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::session`



-  [Resource `GlobalInfo`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_GlobalInfo)
-  [Resource `SessionInfo`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_SessionInfo)
-  [Resource `Badge`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_Badge)
-  [Constants](#@Constants_0)
-  [Function `assert_session_valid`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_session_valid)
-  [Function `assert_players_eligibility`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_players_eligibility)
-  [Function `assert_player_registered_in_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_player_registered_in_session)
-  [Function `assert_player_active_in_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_player_active_in_session)
-  [Function `init`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_init)
-  [Function `create_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_create_session)
-  [Function `start_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_start_session)
-  [Function `end_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_end_session)
-  [Function `session_signer`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_session_signer)
-  [Function `session_exists`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_session_exists)
-  [Function `has_active_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_has_active_session)
-  [Function `active_session_id`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_active_session_id)
-  [Function `player_is_in_session`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_player_is_in_session)
-  [Function `is_active`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_is_active)
-  [Function `players`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_players)
-  [Function `add_badge_to_player`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_add_badge_to_player)
-  [Function `remove_badges_from_players`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_remove_badges_from_players)


<pre><code><b>use</b> <a href="">0x1::object</a>;
<b>use</b> <a href="">0x1::option</a>;
<b>use</b> <a href="">0x1::smart_vector</a>;
<b>use</b> <a href="">0x1::timestamp</a>;
<b>use</b> <a href="">0x1::vector</a>;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_GlobalInfo"></a>

## Resource `GlobalInfo`

Global storage for the global information; serves as a lobby


<pre><code><b>struct</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_GlobalInfo">GlobalInfo</a> <b>has</b> key
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_SessionInfo"></a>

## Resource `SessionInfo`

Global storage for the game data


<pre><code><b>struct</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_SessionInfo">SessionInfo</a> <b>has</b> key
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_Badge"></a>

## Resource `Badge`

Global resource stored under wallets that got matched and are in a session


<pre><code><b>struct</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_Badge">Badge</a> <b>has</b> key
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_EPLAYER_HAS_ACTIVE_GAME"></a>

A player has an active game or did not leave the previous game


<pre><code><b>const</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_EPLAYER_HAS_ACTIVE_GAME">EPLAYER_HAS_ACTIVE_GAME</a>: u64 = 1;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_ESESSION_INVALID"></a>

The session is wrong or not valid


<pre><code><b>const</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_ESESSION_INVALID">ESESSION_INVALID</a>: u64 = 2;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_ETIME_INVALID"></a>

The time is invalid


<pre><code><b>const</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_ETIME_INVALID">ETIME_INVALID</a>: u64 = 3;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_session_valid"></a>

## Function `assert_session_valid`

sanity check to ensure the session is valid


<pre><code><b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_session_valid">assert_session_valid</a>(session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_players_eligibility"></a>

## Function `assert_players_eligibility`

Sanity check to ensure players are eligible to play


<pre><code><b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_players_eligibility">assert_players_eligibility</a>(players: <a href="">vector</a>&lt;<b>address</b>&gt;)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_player_registered_in_session"></a>

## Function `assert_player_registered_in_session`

Sanity check to ensure the player's address is registered in the session


<pre><code><b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_player_registered_in_session">assert_player_registered_in_session</a>(player_addr: <b>address</b>, session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_player_active_in_session"></a>

## Function `assert_player_active_in_session`

Sanity check to ensure the player is in the session


<pre><code><b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_assert_player_active_in_session">assert_player_active_in_session</a>(players: <a href="">vector</a>&lt;<b>address</b>&gt;, session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_init"></a>

## Function `init`

Initializes the global info resource


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_init">init</a>(deployer: &<a href="">signer</a>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_create_session"></a>

## Function `create_session`

Function to create a new session; usable only by defined signers
Returns the session id
The number of players and the deposit amount are specific to a game type and are defined in the game type module


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_create_session">create_session</a>(players: <a href="">vector</a>&lt;<b>address</b>&gt;): <b>address</b>
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_start_session"></a>

## Function `start_session`

Function to trigger when all players have joined the game
This will trigger the game to start


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_start_session">start_session</a>(session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_end_session"></a>

## Function `end_session`

Function to end the session
This will trigger the game to end


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_end_session">end_session</a>(session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_session_signer"></a>

## Function `session_signer`

Function to get the signer of the session manager object


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_session_signer">session_signer</a>(session_id: <b>address</b>): <a href="">signer</a>
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_session_exists"></a>

## Function `session_exists`

Returns if the session exists


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_session_exists">session_exists</a>(session_id: <b>address</b>): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_has_active_session"></a>

## Function `has_active_session`

Returns true if a player is in a session


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_has_active_session">has_active_session</a>(player_addr: <b>address</b>): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_active_session_id"></a>

## Function `active_session_id`

Returns the active session id of a player


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_active_session_id">active_session_id</a>(player_addr: <b>address</b>): <a href="_Option">option::Option</a>&lt;<b>address</b>&gt;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_player_is_in_session"></a>

## Function `player_is_in_session`

Returns true if the player is in the session


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_player_is_in_session">player_is_in_session</a>(player_addr: <b>address</b>, session_id: <b>address</b>): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_is_active"></a>

## Function `is_active`

Returns whether the session is active or not


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_is_active">is_active</a>(session_id: <b>address</b>): bool
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_players"></a>

## Function `players`

Returns the addresses of the players in the session


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_players">players</a>(session_id: <b>address</b>): <a href="">vector</a>&lt;<b>address</b>&gt;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_add_badge_to_player"></a>

## Function `add_badge_to_player`

Internal function to add badges to players joining a session, disallowing them to join another session


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_add_badge_to_player">add_badge_to_player</a>(signer_ref: &<a href="">signer</a>, session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_remove_badges_from_players"></a>

## Function `remove_badges_from_players`

Internal function to remove badges from players, allowing them to leave the session


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="session.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_session_remove_badges_from_players">remove_badges_from_players</a>(player_addr: <b>address</b>)
</code></pre>
