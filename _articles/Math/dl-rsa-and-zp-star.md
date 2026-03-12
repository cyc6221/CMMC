---
layout: page
title: Discrete Logarithm, RSA, and the Structure of $\mathbb{Z}_p^{\ast}$
date: 2026-03-11
last_updated: 2026-03-11
tags: [discrete-logarithm, RSA, finite-field, group-theory, cyclic-group]
---

Discrete Logarithm 與 RSA 都使用 modular arithmetic，但兩者的數學設定不同。finite-field Discrete Logarithm 通常在 $\mathbb{Z}_p^{\ast}$ 上討論，其中 $p$ 是質數；RSA 則使用 composite modulus $N = pq$，其中 $p,q$ 是大質數。前者重點在 group structure，後者重點不在 cyclic group 中求 logarithm。理解 $\mathbb{Z}_p^{\ast}$、group order、element order、primitive root 與 subgroup 之間的關係，有助於區分這兩類問題。

## DL and RSA

### Discrete Logarithm Setting

finite-field Discrete Logarithm problem 常寫成

$$
g^x \equiv h \pmod p,
$$

其中 $g,h \in \mathbb{Z}_p^{\ast}$，目標是求出 exponent $x$。因此其背景通常是 prime modulus 下的 multiplicative group。

### RSA Modulus

RSA 的 modulus 為 $N = pq$，其中 $p,q$ 是大質數，因此 $N$ 是 composite integer。這與 finite-field Discrete Logarithm 使用 prime modulus 的情況不同。

## The Group $\mathbb{Z}_p^{\ast}$

### Definition

當 $p$ 是質數時，$\mathbb{Z}_p^{\ast} = \{1,2,\dots,p-1\}$，表示模 $p$ 下所有 nonzero elements 所形成的 multiplicative group。

### Group Order

因為 $1,2,\dots,p-1$ 都與 $p$ 互質，所以

$$
\lvert \mathbb{Z}_p^{\ast} \rvert = p-1.
$$

### Cyclic Structure

當 $p$ 是質數時，$\mathbb{Z}_p^{\ast}$ 是 cyclic group。也就是說，存在某個元素 $g$ 使得

$$
\mathbb{Z}_p^{\ast} = \langle g \rangle.
$$

這樣的元素稱為 generator；若它生成整個 $\mathbb{Z}_p^{\ast}$，也稱為 primitive root modulo $p$。

## Cyclic Groups, Generators, and Order

### Meaning of Cyclic Group

cyclic group 表示存在某個元素可以生成整個群。這是結構描述，不是大小描述。group 是否為 cyclic，與其 order 是否等於某個特定數值是不同概念。

在特定情況 $G = \mathbb{Z}_p^{\ast}$ 且 $p$ 是質數時，才有

$$
\lvert G \rvert = p-1.
$$

### Primitive Root

若元素 $g$ 滿足 $\langle g \rangle = \mathbb{Z}_p^{\ast}$，則

$$
\operatorname{ord}(g)=p-1.
$$

此時 $g$ 是 primitive root。

### Proper Subgroup

不是每個元素都能生成整個 $\mathbb{Z}_p^{\ast}$。若 $g$ 不是 primitive root，則 $\langle g \rangle \subsetneq \mathbb{Z}_p^{\ast}$，且

$$
\lvert \langle g \rangle \rvert \mid (p-1).
$$

因此 element order 一定整除 group order。

## Subgroups and the Role of $q$

### Subgroup Used in Cryptography

在 cryptography 中，Discrete Logarithm 不一定直接放在整個 $\mathbb{Z}_p^{\ast}$ 上。常見做法是選擇其中一個 large cyclic subgroup。

通常先選大質數 $p$，再選大質數 $q$ 使得 $q \mid (p-1)$，然後選 $g$ 滿足 $\operatorname{ord}(g)=q$。此時實際使用的是 $\langle g \rangle$ 這個 order 為 $q$ 的 subgroup。

### Meaning of $q$

若大群為 $\mathbb{Z}_p^{\ast}$，則

$$
\lvert \mathbb{Z}_p^{\ast} \rvert = p-1.
$$

若實際工作在 $\langle g \rangle$ 上，則

$$
q = \lvert \langle g \rangle \rvert = \operatorname{ord}(g).
$$

因此 $q$ 通常表示實際使用的 subgroup order，而不是整個大群的 order。

### Relation Among $p-1$, $q$, and $g$

在這個設定下，應區分 $\lvert \mathbb{Z}_p^{\ast} \rvert = p-1$ 與 $\lvert \langle g \rangle \rvert = q$。兩者之間的關係為

$$
q \mid (p-1).
$$

### Meaning of “Large $g$”

此處的「large」不是指 $g$ 的數值大小，而是指它的 order。真正重要的是 $\operatorname{ord}(g)$。若要在 order 為 $q$ 的 subgroup 上工作，則需要 $\operatorname{ord}(g)=q$。

## Uniqueness of Subgroups in Finite Cyclic Groups

### Subgroup Determined by Its Order

若 $G$ 是 finite cyclic group，且

$$
\lvert G \rvert=n,
$$

則對每個 $q \mid n$ 都恰好存在一個 order 為 $q$ 的 subgroup。因此在 finite cyclic group 中，subgroup 由其 order 唯一決定。

### Meaning of Divisor

此處的 divisor $q$ 是指 $q \mid \lvert G \rvert$。例如若

$$
\lvert G \rvert=22,
$$

則 divisors 為 $1,2,11,22$。

### Same Order Implies Same Subgroup

若 $G$ 是 cyclic group，且

$$
\lvert \langle g_1\rangle \rvert = \lvert \langle g_2\rangle \rvert = q,
$$

則

$$
\langle g_1\rangle = \langle g_2\rangle.
$$

因此在 $\mathbb{Z}_p^{\ast}$ 中，若兩個元素生成的子群具有相同 order，則它們生成的是同一個 subgroup。

## When Is $\mathbb{Z}_n^{\ast}$ Cyclic?

### General Characterization

$\mathbb{Z}_n^{\ast}$ 並非只有在 $n$ 為質數時才是 cyclic。其分類為

$$
\mathbb{Z}_n^{\ast} \text{ is cyclic } \iff n=1,2,4,p^k,2p^k
$$

其中 $p$ 是 odd prime，且 $k \ge 1$。

### Examples

<div class="example">
    <strong> 是 cyclic ： </strong>
    <ul>
        <li> $n=7$ </li>
        <li> $n=9=3^2$ </li>
        <li> $n=18=2\cdot 3^2$ </li>
    </ul>
    <strong> 不是 cyclic ： </strong>
    <ul>
        <li> $n=8$ </li>
        <li> $n=12$ </li>
        <li> $n=15$ </li>
    </ul>
</div>
