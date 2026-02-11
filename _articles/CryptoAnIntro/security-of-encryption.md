---
layout: page
title: Security of Encryption
date: 2026-02-11
last_updated: 2026-02-11
tags: []
---

## Notions of Security

### Perfect Security

### Semantic Security

### Polynomial Security

## Notions of Attacks

### Passive Attack

### Chosen Ciphertext Attack

### Adaptive Chosen Ciphertext Attack

---

<div class="definition">

A public key encryption algorithm is said to be secure if it is semantically secure against an adaptive chosen plaintext attack.

</div>

<div class="definition">

A public key encryption algorithm is said to be secure if it is polynomially secure against an adaptive chosen plaintext attack.

</div>

<div class="theorem">

For a passive adversary, a system which is polynomially secure must necessarily be semantically secure.

</div>

## Others

### Non-Malleability

<div class="theorem">

<strong> Lemma. </strong>

A malleable encryption scheme is not secure against an adaptive chosen ciphertext attack.

</div>

### Plaintext Aware
