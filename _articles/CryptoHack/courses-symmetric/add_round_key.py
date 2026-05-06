state = [
    [206, 243, 61, 34],
    [171, 11, 93, 31],
    [16, 200, 91, 108],
    [150, 3, 194, 51],
]

round_key = [
    [173, 129, 68, 82],
    [223, 100, 38, 109],
    [32, 189, 53, 8],
    [253, 48, 187, 78],
]


def add_round_key(s, k):
    """ Add (XOR) the round key to the state.  """
    # Solution for aes3: XOR each byte in the state with the byte
    # at the same position in the round key.
    return [[ss ^ kk for ss, kk in zip(s_row, k_row)]
            for s_row, k_row in zip(s, k)]

from matrix import matrix2bytes

print(add_round_key(state, round_key))

print(matrix2bytes(add_round_key(state, round_key)))
