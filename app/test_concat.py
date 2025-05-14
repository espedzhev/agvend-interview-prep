from main import safe_pairwise_concat


def test_equal_length_lists():
    result = safe_pairwise_concat(["a", "b", "c"], ["1", "2", "3"])
    assert result == ["a1", "b2", "c3"]


def test_list1_longer():
    result = safe_pairwise_concat(["a", "b", "c"], ["1", "2"])
    assert result == ["a1", "b2", "c"]


def test_list2_longer():
    result = safe_pairwise_concat(["x", "y"], ["9", "8", "7"])
    assert result == ["x9", "y8", "7"]


def test_both_empty():
    result = safe_pairwise_concat([], [])
    assert result == []
