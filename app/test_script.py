from script import read_lines

def test_simple():
    input_lines = [
            "1,2,3\n",
            "4,5,6\n",
            "7,8,9\n",
            "10,11,12\n"
        ]

    result = read_lines(input_lines)
    assert result == {
        0: [1, 2, 3],
        1: [4, 5, 6],
        2: [7, 8, 9],
        3: [10, 11, 12],
    }
