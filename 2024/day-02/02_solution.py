from typing import List, Literal, Union


def get_reports() -> List[List[int]]:
    reports: List[List[int]] = []

    with open("02_puzzle_input.txt", "r") as file:
        for line in file:
            levels: List[int] = []
            for level in line.split(' '):
                levels.append(int(level))
            reports.append(levels)
    
    return reports


# Technically this is strictly monotonic
def is_monotonic(
        levels: List[int],
        direction: Union[Literal["increasing"], Literal["decreasing"]]
    ) -> bool:
    if len(set(levels)) != len(levels):
        return False
    
    if direction == "decreasing":
        return levels == sorted(levels, reverse=True)
    
    if direction == "increasing":
        return levels == sorted(levels)


def is_diff_safe(levels: List[int]) -> bool:
    for idx in range(1, len(levels)):
        diff = abs(levels[idx] - levels[idx - 1])
        if diff < 1 or diff > 3:
            return False
    
    return True


def is_level_safe(levels: List[int]) -> bool:
    _is_diff_safe = is_diff_safe(levels)
    is_inc_montonic = is_monotonic(levels, direction="increasing")
    is_dec_monotonic = is_monotonic(levels, direction="decreasing")

    if _is_diff_safe:
        if is_inc_montonic:
            return True
        if is_dec_monotonic:
            return True

    return False


if __name__ == "__main__":
    part_number = input("Which part number would you like the solution to? ")
    if (part_number not in ["1", "2"]):
        raise Exception("Part number must be 1 or 2")

    reports = get_reports()
    num_safe_reports = 0

    for levels in reports:
        full_level_safe = is_level_safe(levels)
        
        if full_level_safe:
            num_safe_reports += 1
        elif part_number == "2":
            for idx in range(len(levels)):
                level_removed = levels[:idx] + levels[idx + 1:]
                partial_level_safe = is_level_safe(level_removed)

                if partial_level_safe:
                    num_safe_reports += 1
                    break
    
    print(num_safe_reports)
