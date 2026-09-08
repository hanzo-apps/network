# Hanzo Proof of AI

## The proposition

Hanzo Proof of AI turns real AI workloads into mineable work. A cloud provider,
decentralized operator, or idle CPU/GPU node may execute a customer-funded or
network-admitted inference, embedding, evaluation, or deterministic training job.
The provider keeps its ordinary workload payment and may also earn a declining
`AI` reward by producing evidence that the exact admitted computation was done.

This is not a synthetic matrix puzzle. The mined work is the requested model
execution and its result is delivered to a committed consumer.

## CPU-verifiable useful work

Supported jobs use a canonical integer execution specification. The miner commits
the model, input, output, execution graph, transcript, and metering before an
unpredictable challenge is derived. CPU validators can then:

- exactly replay small jobs;
- verify Merkle-bound graph openings;
- check an opened matrix product with Freivalds in quadratic rather than cubic
  work;
- challenge withheld or inconsistent transcript data; or
- verify an activated post-quantum succinct proof when that backend is ready.

A local Freivalds check does not automatically prove a whole model run. Production
security additionally requires graph binding, challenge coverage, data
availability, finality delay, and verifiable metering. TEE evidence is optional
for confidential workloads and is not the definition of Proof of AI.

## One mining authority, P3Q settlement, omnichain payout

Proof of AI consensus exists only on the Lux A-Chain:

1. A-Chain admits the useful job and fixes its consumer, proof policy, reward,
   destination chain, and destination recipient.
2. A CPU or GPU provider executes the job and commits the result and transcript.
3. A-Chain PoAI consensus validates that the bound work was actually performed,
   consumes the global work nullifier, and finalizes one receipt.
4. Z-Chain batches the finalized A-Chain receipt transition through P3Q, a
   Plonky3-derived, pairing-free STARK/FRI settlement rollup. Z-Chain compresses
   and settles an A-Chain decision; it does not admit mining work or decide that
   the job was useful.
5. Lux Quasar orders and finalizes the corresponding A-Chain and Z-Chain state.
   The activated post-quantum validator policy authenticates the settlement root.
6. Warp/Teleport, a native boundary, or an authenticated relay carries the
   Z-settled receipt and inclusion proof to the destination named before mining.
7. The destination verifies and consumes the receipt exactly once. It never
   accepts raw work or runs an independent mining verifier.

"Mine into any chain" therefore means choose the payout destination on the
A-Chain job. It never means another chain can mine or mint independently.

### P3Q maturity boundary

P3Q is the intended Z-Chain proof-compression substrate. Production succinct
settlement requires the exact PoAI AIR, recursive batch policy, A-to-Z state
binding, verifier, audits, and protocol activation. Until those gates pass,
Z-Chain may checkpoint only an independently authenticated, already-final
A-Chain receipt root and must not claim that a generic P3Q component proves the
underlying AI workload.

## AI monetary policy

`AI` has a hard maximum nominal supply of 2 trillion:

- 1 trillion AI is allocated permanently to the Hanzo DAO treasury and is not
  mineable.
- 1 trillion AI is reserved exclusively for PoAI miner and validator rewards.
- The proof-earned pool follows a Bitcoin-style geometric schedule: at most 500
  billion in the first era, 250 billion in the second, 125 billion in the third,
  and so on, converging to 1 trillion.
- Fee burns may reduce net supply; no destination representation may increase it.

The exact halving interval and reward-weighting formula must be fixed before
activation and keyed to finalized A-Chain height.

## Why existing AI clouds participate

- **Incremental revenue:** providers keep their normal customer payment and earn
  AI for adding verifiable evidence to work they already perform.
- **No forced hardware monopoly:** jobs may execute on CPU or GPU; ordinary CPU
  validators can verify supported proof openings.
- **Auditable service:** customers receive a portable receipt binding the model,
  input, output, runtime, provider, and proof status.
- **Capacity utilization:** the same provider adapter can accept decentralized
  jobs when reserved cloud capacity would otherwise sit idle.
- **Open settlement:** one P3Q-settled, PQ-authenticated receipt can pay into any
  supported destination without turning Z-Chain or that destination into a
  mining authority.

## Anti-farming requirements

The subsidy is not awarded for a self-reported GPU-hour, a miner-created circular
job, a copied output, or a signature alone. Eligibility requires independently
admitted demand or a governed network-service budget, job-specific execution
evidence, verifiable metering, global nullifier consumption, and compliance with
the active era cap. These rules must be implemented and tested before mining is
enabled.
