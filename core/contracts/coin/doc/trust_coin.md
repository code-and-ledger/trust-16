
<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin"></a>

# Module `0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98::trust_coin`



-  [Resource `Roles`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Roles)
-  [Resource `Management`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Management)
-  [Resource `State`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_State)
-  [Resource `ExchangeRates`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeRates)
-  [Resource `ExchangeData`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeData)
-  [Resource `AllowDeposit`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_AllowDeposit)
-  [Resource `AllowWithdraw`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_AllowWithdraw)
-  [Struct `Burned`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Burned)
-  [Struct `Minted`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Minted)
-  [Struct `Paused`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Paused)
-  [Struct `DenylistUpdated`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_DenylistUpdated)
-  [Struct `CoinsBurned`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_CoinsBurned)
-  [Struct `CoinsFrozen`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_CoinsFrozen)
-  [Struct `ExchangeAdded`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeAdded)
-  [Constants](#@Constants_0)
-  [Function `assert_minter`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_minter)
-  [Function `assert_owner`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_owner)
-  [Function `assert_pauser`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_pauser)
-  [Function `assert_denylister`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_denylister)
-  [Function `assert_not_paused`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_not_paused)
-  [Function `assert_allowlisted`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_allowlisted)
-  [Function `assert_withdrawer`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_withdrawer)
-  [Function `withdraw`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw)
-  [Function `mint`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_mint)
-  [Function `burn`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_burn)
-  [Function `admin_add_to_denylist`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_to_denylist)
-  [Function `admin_add_all_to_denylist`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_all_to_denylist)
-  [Function `admin_remove_from_denylist`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_remove_from_denylist)
-  [Function `admin_remove_all_from_denylist`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_remove_all_from_denylist)
-  [Function `admin_add_limited_exchange_entry`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_limited_exchange_entry)
-  [Function `admin_add_default_exchange_entry`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_default_exchange_entry)
-  [Function `withdraw_seed`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw_seed)
-  [Function `coin_address`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_coin_address)
-  [Function `metadata`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_metadata)
-  [Function `mint_obj_addr`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_mint_obj_addr)
-  [Function `withdraw_obj_addr`](#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw_obj_addr)


<pre><code><b>use</b> <a href="">0x1::aptos_coin</a>;
<b>use</b> <a href="">0x1::coin</a>;
<b>use</b> <a href="">0x1::dispatchable_fungible_asset</a>;
<b>use</b> <a href="">0x1::event</a>;
<b>use</b> <a href="">0x1::function_info</a>;
<b>use</b> <a href="">0x1::fungible_asset</a>;
<b>use</b> <a href="">0x1::object</a>;
<b>use</b> <a href="">0x1::option</a>;
<b>use</b> <a href="">0x1::primary_fungible_store</a>;
<b>use</b> <a href="">0x1::signer</a>;
<b>use</b> <a href="">0x1::smart_table</a>;
<b>use</b> <a href="">0x1::string</a>;
<b>use</b> <a href="">0x1::string_utils</a>;
<b>use</b> <a href="">0x1::timestamp</a>;
<b>use</b> <a href="">0x1::vector</a>;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Roles"></a>

## Resource `Roles`

Global storage for trust coin's roles


<pre><code>#[resource_group_member(#[group = <a href="_ObjectGroup">0x1::object::ObjectGroup</a>])]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Roles">Roles</a> <b>has</b> key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Management"></a>

## Resource `Management`

Global storage for trust coin's refs


<pre><code>#[resource_group_member(#[group = <a href="_ObjectGroup">0x1::object::ObjectGroup</a>])]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Management">Management</a> <b>has</b> key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_State"></a>

## Resource `State`

Global storage for trust coin's state


<pre><code>#[resource_group_member(#[group = <a href="_ObjectGroup">0x1::object::ObjectGroup</a>])]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_State">State</a> <b>has</b> key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeRates"></a>

## Resource `ExchangeRates`

Global storage for trust coin's fixed exchange <Name, ExchangeData>


<pre><code>#[resource_group_member(#[group = <a href="_ObjectGroup">0x1::object::ObjectGroup</a>])]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeRates">ExchangeRates</a> <b>has</b> key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeData"></a>

## Resource `ExchangeData`

Global storage for trust coin's exchange data


<pre><code>#[resource_group_member(#[group = <a href="_ObjectGroup">0x1::object::ObjectGroup</a>])]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeData">ExchangeData</a> <b>has</b> store, key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_AllowDeposit"></a>

## Resource `AllowDeposit`

Resource that is used to allow an account to use the deposit function


<pre><code><b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_AllowDeposit">AllowDeposit</a> <b>has</b> key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_AllowWithdraw"></a>

## Resource `AllowWithdraw`

Resource that is used to allow an account to use the withdraw function


<pre><code><b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_AllowWithdraw">AllowWithdraw</a> <b>has</b> key
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Burned"></a>

## Struct `Burned`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Burned">Burned</a> <b>has</b> drop, store
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Minted"></a>

## Struct `Minted`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Minted">Minted</a> <b>has</b> drop, store
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Paused"></a>

## Struct `Paused`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_Paused">Paused</a> <b>has</b> drop, store
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_DenylistUpdated"></a>

## Struct `DenylistUpdated`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_DenylistUpdated">DenylistUpdated</a> <b>has</b> drop, store
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_CoinsBurned"></a>

## Struct `CoinsBurned`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_CoinsBurned">CoinsBurned</a> <b>has</b> drop, store
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_CoinsFrozen"></a>

## Struct `CoinsFrozen`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_CoinsFrozen">CoinsFrozen</a> <b>has</b> drop, store
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeAdded"></a>

## Struct `ExchangeAdded`



<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ExchangeAdded">ExchangeAdded</a> <b>has</b> drop, store
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EUNAUTHORIZED"></a>

Caller is not authorized to make this call


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EUNAUTHORIZED">EUNAUTHORIZED</a>: u64 = 4;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ENOT_OWNER"></a>

The caller is not the owner of the token


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ENOT_OWNER">ENOT_OWNER</a>: u64 = 0;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ADDED"></a>

denylist actions


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ADDED">ADDED</a>: <a href="">vector</a>&lt;u8&gt; = [100, 101, 110, 121, 108, 105, 115, 116, 101, 100];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ECOIN_NOT_BURNABLE"></a>

The coin is not burnable


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ECOIN_NOT_BURNABLE">ECOIN_NOT_BURNABLE</a>: u64 = 1;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ECOIN_NOT_FREEZABLE"></a>

The coin is not freezable


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ECOIN_NOT_FREEZABLE">ECOIN_NOT_FREEZABLE</a>: u64 = 2;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EDENYLISTED"></a>

The account is denylisted


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EDENYLISTED">EDENYLISTED</a>: u64 = 5;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EINVALID_TIME"></a>

Invalid time settings


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EINVALID_TIME">EINVALID_TIME</a>: u64 = 6;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EPAUSED"></a>

No operations are allowed when contract is paused


<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_EPAUSED">EPAUSED</a>: u64 = 3;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ICON"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_ICON">ICON</a>: <a href="">vector</a>&lt;u8&gt; = [104, 116, 116, 112, 115, 58, 47, 47, 116, 114, 117, 115, 116, 45, 49, 54, 46, 99, 111, 109, 47, 102, 97, 118, 105, 99, 111, 110, 46, 105, 99, 111];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_MINT_SEED"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_MINT_SEED">MINT_SEED</a>: <a href="">vector</a>&lt;u8&gt; = [116, 114, 117, 115, 116, 95, 99, 111, 105, 110, 58, 58, 109, 105, 110, 116];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_PROJECT"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_PROJECT">PROJECT</a>: <a href="">vector</a>&lt;u8&gt; = [104, 116, 116, 112, 115, 58, 47, 47, 116, 114, 117, 115, 116, 45, 49, 54, 46, 99, 111, 109];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_REMOVED"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_REMOVED">REMOVED</a>: <a href="">vector</a>&lt;u8&gt; = [85, 110, 100, 101, 110, 121, 108, 105, 115, 116, 101, 100];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_TRUST_NAME"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_TRUST_NAME">TRUST_NAME</a>: <a href="">vector</a>&lt;u8&gt; = [84, 114, 117, 115, 116, 32, 67, 111, 105, 110];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_TRUST_SYMBOL"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_TRUST_SYMBOL">TRUST_SYMBOL</a>: <a href="">vector</a>&lt;u8&gt; = [84, 82, 85, 83, 84];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_WITHDRAW_SEED"></a>



<pre><code><b>const</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_WITHDRAW_SEED">WITHDRAW_SEED</a>: <a href="">vector</a>&lt;u8&gt; = [116, 114, 117, 115, 116, 95, 99, 111, 105, 110, 58, 58, 119, 105, 116, 104, 100, 114, 97, 119];
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_minter"></a>

## Function `assert_minter`

Assert the caller is the minter of the token


<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_minter">assert_minter</a>(signer_ref: &<a href="">signer</a>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_owner"></a>

## Function `assert_owner`

Assert the address is the owner of the token


<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_owner">assert_owner</a>(metadata: <a href="_Object">object::Object</a>&lt;<a href="_Metadata">fungible_asset::Metadata</a>&gt;, addr: <b>address</b>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_pauser"></a>

## Function `assert_pauser`



<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_pauser">assert_pauser</a>(signer_ref: &<a href="">signer</a>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_denylister"></a>

## Function `assert_denylister`



<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_denylister">assert_denylister</a>(signer_ref: &<a href="">signer</a>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_not_paused"></a>

## Function `assert_not_paused`



<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_not_paused">assert_not_paused</a>()
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_allowlisted"></a>

## Function `assert_allowlisted`



<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_allowlisted">assert_allowlisted</a>(<a href="">account</a>: <b>address</b>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_withdrawer"></a>

## Function `assert_withdrawer`



<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_assert_withdrawer">assert_withdrawer</a>(signer_ref: &<a href="">signer</a>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw"></a>

## Function `withdraw`

Withdraw function override to impose requirements on the account
Callable only by admins or allowed accounts


<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw">withdraw</a>&lt;T: key&gt;(store: <a href="_Object">object::Object</a>&lt;T&gt;, amount: u64, transfer_ref: &<a href="_TransferRef">fungible_asset::TransferRef</a>): <a href="_FungibleAsset">fungible_asset::FungibleAsset</a>
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_mint"></a>

## Function `mint`

Mint new assets to the specified account.
TODO: should take key instead of amount
TODO: This should be in router module in order to be able to use both trust_coin and rewards_pool modules


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_mint">mint</a>(minter: &<a href="">signer</a>, <b>to</b>: <b>address</b>, amount: u64)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_burn"></a>

## Function `burn`

Burn assets from the specified account.


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_burn">burn</a>(obj_signer_ref: &<a href="">signer</a>, from: <b>address</b>, amount: u64)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_to_denylist"></a>

## Function `admin_add_to_denylist`

Add an account to the denylist. This checks that the caller is the denylister.


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_to_denylist">admin_add_to_denylist</a>(denylister: &<a href="">signer</a>, <a href="">account</a>: <b>address</b>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_all_to_denylist"></a>

## Function `admin_add_all_to_denylist`

Add all accounts in the given list to the denylist. This checks that the caller is the denylister.


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_all_to_denylist">admin_add_all_to_denylist</a>(denylister: &<a href="">signer</a>, accounts: <a href="">vector</a>&lt;<b>address</b>&gt;)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_remove_from_denylist"></a>

## Function `admin_remove_from_denylist`

Remove an account from the denylist. This checks that the caller is the denylister.


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_remove_from_denylist">admin_remove_from_denylist</a>(denylister: &<a href="">signer</a>, <a href="">account</a>: <b>address</b>)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_remove_all_from_denylist"></a>

## Function `admin_remove_all_from_denylist`

Remove all accounts in the given list from the denylist. This checks that the caller is the denylister.


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_remove_all_from_denylist">admin_remove_all_from_denylist</a>(denylister: &<a href="">signer</a>, accounts: <a href="">vector</a>&lt;<b>address</b>&gt;)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_limited_exchange_entry"></a>

## Function `admin_add_limited_exchange_entry`

Add a new limited exchange entry to the exchange table
Callable only by the owner of the token only


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_limited_exchange_entry">admin_add_limited_exchange_entry</a>(signer_ref: &<a href="">signer</a>, coin_metadata: <a href="_Object">object::Object</a>&lt;<a href="_Metadata">fungible_asset::Metadata</a>&gt;, coin_amount: u64, trust_amount_to_receive: u64, maybe_start_time: u64, maybe_end_time: u64)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_default_exchange_entry"></a>

## Function `admin_add_default_exchange_entry`

Add a new default exchange entry to the exchange table
Callable only by the owner of the token only


<pre><code><b>public</b> entry <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_admin_add_default_exchange_entry">admin_add_default_exchange_entry</a>(signer_ref: &<a href="">signer</a>, coin_metadata: <a href="_Object">object::Object</a>&lt;<a href="_Metadata">fungible_asset::Metadata</a>&gt;, coin_amount: u64, trust_amount_to_receive: u64, maybe_start_time: u64, maybe_end_time: u64)
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw_seed"></a>

## Function `withdraw_seed`

Helper function to get the withraw seed


<pre><code><b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw_seed">withdraw_seed</a>(): <a href="">vector</a>&lt;u8&gt;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_coin_address"></a>

## Function `coin_address`

Returns the address of trust coin


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_coin_address">coin_address</a>(): <b>address</b>
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_metadata"></a>

## Function `metadata`

Returns the metadata of trust coin


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_metadata">metadata</a>(): <a href="_Object">object::Object</a>&lt;<a href="_Metadata">fungible_asset::Metadata</a>&gt;
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_mint_obj_addr"></a>

## Function `mint_obj_addr`

Returns the address of the mint object


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_mint_obj_addr">mint_obj_addr</a>(): <b>address</b>
</code></pre>



<a id="0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw_obj_addr"></a>

## Function `withdraw_obj_addr`

Returns the address of the withdraw object


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="trust_coin.md#0xce3824597867081e7e16b21f4d364f90b1abae40b92e23dd915e5330719c2e98_trust_coin_withdraw_obj_addr">withdraw_obj_addr</a>(): <b>address</b>
</code></pre>
