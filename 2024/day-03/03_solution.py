from typing import Any, List


def is_int(element: str) -> bool:
    try:
        int(element)
        return True
    except ValueError:
        return False


def read_memory() -> List[str]:
    with open("03_puzzle_input.txt", "r") as file:
        return [line for line in file]


if __name__ == "__main__":
    part_number = input("Which part number would you like the solution to? ")
    if (part_number not in ["1", "2"]):
        raise Exception("Part number must be 1 or 2")

    memory = read_memory()

    multiplication_results: List[int] = []

    is_enabled = True
    for line in memory:
        for idx in range(len(line)):
            if part_number == "2":
                if line[idx:idx + 4] == "do()":
                    is_enabled = True
                if line[idx:idx + 7] == "don't()":
                    is_enabled = False

            if line[idx:idx + 4] == "mul(":
                closing_paren_index = line[idx + 3:].index(")")

                fn_args = line[idx + 4:closing_paren_index + idx + 3]
                fn_args_split = fn_args.split(",")
                if len(fn_args_split) != 2:
                    continue
                if is_int(fn_args_split[0]) and is_int(fn_args_split[1]):
                    if is_enabled:
                        multiplication_results.append(int(fn_args_split[0]) * int(fn_args_split[1]))

    print(sum(multiplication_results))
