"""Print the first N decimal digits of pi, in groups of five.

Usage: python pi_digits.py [N]   (default N = 100000, a multiple of 50)

The digits are computed twice, with mpmath and with Machin's formula
in integer arithmetic, and must agree before anything is printed.
"""

import sys

from mpmath import mp

sys.set_int_max_str_digits(0)

GROUP = 5     # digits per group
PER_LINE = 50  # digits per line


def digits_mpmath(n):
    mp.dps = n + 50
    return str(mp.pi)[2:2 + n]


def arctan_inv(x, one):
    """arctan(1/x) * one, by the Taylor series in integer arithmetic."""
    total = term = one // x
    x2, k, sign = x * x, 3, -1
    while term:
        term //= x2
        total += sign * (term // k)
        sign, k = -sign, k + 2
    return total


def digits_machin(n):
    # pi/4 = 4 arctan(1/5) - arctan(1/239); 20 guard digits absorb truncation error
    one = 10 ** (n + 20)
    pi = 4 * (4 * arctan_inv(5, one) - arctan_inv(239, one))
    return str(pi)[1:1 + n]


def format_digits(d):
    lines = []
    for i in range(0, len(d), PER_LINE):
        line = d[i:i + PER_LINE]
        groups = " ".join(line[j:j + GROUP] for j in range(0, len(line), GROUP))
        lines.append(("π = 3." if i == 0 else "      ") + groups)
    return "\n".join(lines)


def main():
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 100000
    d = digits_mpmath(n)
    if d != digits_machin(n):
        sys.exit("mpmath and Machin disagree")
    sys.stdout.reconfigure(encoding="utf-8")
    print(format_digits(d))


if __name__ == "__main__":
    main()
