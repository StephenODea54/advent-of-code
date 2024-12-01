from typing import List, Literal, Tuple, Union


def get_lists() -> Tuple[List[int], List[int]]:
    your_list: List[int] = []
    historians_list: List[int] = []

    with open("01_puzzle_input.txt", "r") as file:
        for line in file:
            location_ids = line.split("   ")
            your_list.append(int(location_ids[0]))
            historians_list.append(int(location_ids[-1].replace("\n", "")))
    
    return your_list, historians_list


def part_one_solution(
        your_list: List[int],
        historians_list: List[int],
) -> int:
    your_list_sorted = sorted(your_list)
    historians_list_sorted = sorted(historians_list)

    total = 0

    for idx, location_id in enumerate(your_list_sorted):
        total += abs(location_id - historians_list_sorted[idx])

    return total


def part_two_solution(
    your_list: List[int],
    historians_list: List[int],
) -> int:
    similarity_score = 0

    for location_id in your_list:
        num_occurences = len(list(filter(lambda x: x == location_id, historians_list)))
        similarity_score += location_id * num_occurences

    return similarity_score


def get_solution(part_number: Union[Literal["1"], Literal["2"]]) -> int:
    your_list, historians_list = get_lists()

    solutions = {
        "1": part_one_solution,
        "2": part_two_solution,
    }

    result = solutions[part_number](your_list, historians_list)
    return result


if __name__ == "__main__":
    part_number = input("Which part number would you like the solution to?")

    if (part_number not in ["1", "2"]):
        raise Exception("Part number must be 1 or 2")

    solution = get_solution(part_number)
    print(f"The solution for Day 1 part {part_number} is: {solution}")
