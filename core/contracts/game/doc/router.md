
<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router"></a>

# Module `0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::router`



-  [Struct `SessionCreated`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_SessionCreated)
-  [Constants](#@Constants_0)
-  [Function `admin_prepare_short_game`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_admin_prepare_short_game)
-  [Function `join_game`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_join_game)
-  [Function `submit_decision`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_submit_decision)
-  [Function `admin_submit_pepper_and_finish_round`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_admin_submit_pepper_and_finish_round)


<pre><code><b>use</b> <a href="">0x1::event</a>;
<b>use</b> <a href="">0x1::signer</a>;
<b>use</b> <a href="">0x1::string</a>;
<b>use</b> <a href="mechanics.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_mechanics">0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::mechanics</a>;
<b>use</b> <a href="short_game.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_short_game">0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::short_game</a>;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_SessionCreated"></a>

## Struct `SessionCreated`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="router.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_SessionCreated">SessionCreated</a> <b>has</b> drop, store
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_ENOT_AUTHORIZED"></a>

Not authorized


<pre><code><b>const</b> <a href="router.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_ENOT_AUTHORIZED">ENOT_AUTHORIZED</a>: u64 = 1;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_admin_prepare_short_game"></a>

## Function `admin_prepare_short_game`

Prepare a short game
Callable by session manager only


<pre><code><b>public</b>(<b>friend</b>) entry <b>fun</b> <a href="router.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_admin_prepare_short_game">admin_prepare_short_game</a>(signer_ref: &<a href="">signer</a>, players: <a href="">vector</a>&lt;<b>address</b>&gt;)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_join_game"></a>

## Function `join_game`

Join a game
Game starts when all players joined


<pre><code><b>public</b>(<b>friend</b>) entry <b>fun</b> <a href="router.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_join_game">join_game</a>(signer_ref: &<a href="">signer</a>, session_id: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_submit_decision"></a>

## Function `submit_decision`

Submit a decision


<pre><code><b>public</b>(<b>friend</b>) entry <b>fun</b> <a href="router.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_submit_decision">submit_decision</a>(signer_ref: &<a href="">signer</a>, session_id: <b>address</b>, round: u64, decision: <a href="">vector</a>&lt;u8&gt;)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_admin_submit_pepper_and_finish_round"></a>

## Function `admin_submit_pepper_and_finish_round`

Submit a pepper
Callable by session manager only


<pre><code><b>public</b>(<b>friend</b>) entry <b>fun</b> <a href="router.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_router_admin_submit_pepper_and_finish_round">admin_submit_pepper_and_finish_round</a>(signer_ref: &<a href="">signer</a>, session_id: <b>address</b>, round: u64, pepper: <a href="">vector</a>&lt;u8&gt;)
</code></pre>
