
<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player"></a>

# Module `0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::player`



-  [Resource `Player`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_Player)
-  [Struct `PlayerCreated`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_PlayerCreated)
-  [Constants](#@Constants_0)
-  [Function `assert_player_exists`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_assert_player_exists)
-  [Function `create_player`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_create_player)
-  [Function `add_decision`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_add_decision)
-  [Function `last_x_decisions`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_last_x_decisions)


<pre><code><b>use</b> <a href="">0x1::event</a>;
<b>use</b> <a href="">0x1::signer</a>;
<b>use</b> <a href="">0x1::smart_vector</a>;
<b>use</b> <a href="">0x1::vector</a>;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_Player"></a>

## Resource `Player`



<pre><code><b>struct</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_Player">Player</a> <b>has</b> key
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_PlayerCreated"></a>

## Struct `PlayerCreated`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_PlayerCreated">PlayerCreated</a> <b>has</b> drop, store
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_EPLAYER_EXISTS"></a>

The player already exists


<pre><code><b>const</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_EPLAYER_EXISTS">EPLAYER_EXISTS</a>: u64 = 1;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_assert_player_exists"></a>

## Function `assert_player_exists`

Assert that the player exists


<pre><code><b>public</b> <b>fun</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_assert_player_exists">assert_player_exists</a>(player_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_create_player"></a>

## Function `create_player`

Create a new player


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_create_player">create_player</a>(signer_ref: &<a href="">signer</a>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_add_decision"></a>

## Function `add_decision`

Add a decision to the player's ledger


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_add_decision">add_decision</a>(signer_ref: &<a href="">signer</a>, decision: bool)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_last_x_decisions"></a>

## Function `last_x_decisions`

Returns the player's x decisions from the decision ledger


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="player.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_player_last_x_decisions">last_x_decisions</a>(player_id: <b>address</b>, x: u64): <a href="">vector</a>&lt;bool&gt;
</code></pre>
