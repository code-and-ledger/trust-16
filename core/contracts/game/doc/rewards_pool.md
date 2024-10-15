
<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool"></a>

# Module `0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::rewards_pool`



-  [Resource `Info`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_Info)
-  [Function `init`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_init)
-  [Function `pool_signer`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_signer)
-  [Function `deposit`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_deposit)
-  [Function `withdraw`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_withdraw)
-  [Function `pool_store_object`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_store_object)
-  [Function `pool_address`](#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_address)


<pre><code><b>use</b> <a href="">0x1::dispatchable_fungible_asset</a>;
<b>use</b> <a href="">0x1::fungible_asset</a>;
<b>use</b> <a href="">0x1::object</a>;
<b>use</b> <a href="">0x1::primary_fungible_store</a>;
<b>use</b> <a href="">0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98::trust_coin</a>;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_Info"></a>

## Resource `Info`

Global storage for the rewards pool


<pre><code><b>struct</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_Info">Info</a> <b>has</b> key
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_init"></a>

## Function `init`

Initializes the info resource; callable by the time of deployment


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_init">init</a>(deployer: &<a href="">signer</a>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_signer"></a>

## Function `pool_signer`

Returns the signer for the pool


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_signer">pool_signer</a>(): <a href="">signer</a>
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_deposit"></a>

## Function `deposit`

Deposits the amount to the rewards pool


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_deposit">deposit</a>(amount: u64, from: <b>address</b>)
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_withdraw"></a>

## Function `withdraw`

Withdraws the amount from the rewards pool


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_withdraw">withdraw</a>(amount: u64): <a href="_FungibleAsset">fungible_asset::FungibleAsset</a>
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_store_object"></a>

## Function `pool_store_object`

Returns the object of the rewards pool store


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_store_object">pool_store_object</a>(): <a href="_Object">object::Object</a>&lt;<a href="_FungibleStore">fungible_asset::FungibleStore</a>&gt;
</code></pre>



<a id="0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_address"></a>

## Function `pool_address`

Returns the address of the rewards pool store


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="rewards_pool.md#0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139_rewards_pool_pool_address">pool_address</a>(): <b>address</b>
</code></pre>
