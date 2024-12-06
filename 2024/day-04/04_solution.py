from abc import ABC, abstractmethod
from typing import List, Union


WORD = "XMAS"


class Direction(ABC):
    @abstractmethod
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        raise NotImplementedError("You can't call an abstract class, STUPID.")


class Right(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> List[str]:
        return crossword[row][col:col+4]


class Left(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        return crossword[row][col-3:col+1][::-1]      


class Up(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        try:
            return crossword[row][col] + crossword[row + 1][col] + crossword[row + 2][col] + crossword[row + 3][col]
        except IndexError:
            return None


class Down(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        try:
            if row >= len(WORD) - 1:
                return crossword[row][col] + crossword[row - 1][col] + crossword[row - 2][col] + crossword[row - 3][col]
        except IndexError:
            return None


class AscendingUp(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        try:
            if row >= len(WORD) - 1:
                return crossword[row][col] + crossword[row - 1][col + 1] + crossword[row - 2][col + 2] + crossword[row - 3][col + 3]
        except IndexError:
            return None


class AscendingDown(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        try:
            return crossword[row][col] + crossword[row + 1][col + 1] + crossword[row + 2][col + 2] + crossword[row + 3][col + 3]
        except IndexError:
            return None


class DescendingUp(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        try:
            if row >= len(WORD) - 1 and col >= len(WORD) - 1:
                return crossword[row][col] + crossword[row - 1][col - 1] + crossword[row - 2][col - 2] + crossword[row - 3][col - 3]
        except IndexError:
            return None


class DescendingDown(Direction):
    def get_crossword_subset(
        self,
        crossword: List[List[str]],
        row: int,
        col: int
    ) -> Union[List[str], None]:
        try:
            if col >= len(WORD) - 1:
                return crossword[row][col] + crossword[row + 1][col - 1] + crossword[row + 2][col - 2] + crossword[row + 3][col - 3]
        except IndexError:
            return None


class CrosswordChecker:
    def __init__(self, crossword_location: str) -> None:
        with open(crossword_location, "r") as file:
            self.crossword = [[char for char in line.strip()] for line in file]
    
    def check_word(
            self,
            direction: Direction,
            row: int,
            col: int
        ) -> bool:
        crossword_subset = direction.get_crossword_subset(self.crossword, row, col)

        return ''.join(crossword_subset) == WORD if crossword_subset is not None else False
    
    def check_x(self, row: int, col: int) -> Union[bool, None]:
        try:
            subset = self.crossword[row][col] + self.crossword[row][col + 2] + self.crossword[row + 1][col + 1] + self.crossword[row + 2][col] + self.crossword[row + 2][col + 2]
            return subset in ['MSAMS', 'SSAMM', 'SMASM', 'MMASS']
        except IndexError:
            return False
        

if __name__ == "__main__":
    part_number = input("Which part number would you like the solution to? ")
    if (part_number not in ["1", "2"]):
        raise Exception("Part number must be 1 or 2")

    total = 0

    crossword_checker = CrosswordChecker("04_puzzle_input.txt")

    if part_number == "1":
        right = Right()
        left = Left()
        up = Up()
        down = Down()
        asc_up = AscendingUp()
        asc_down = AscendingDown()
        desc_up = DescendingUp()
        desc_down = DescendingDown()

        for row in range(len(crossword_checker.crossword)):
            for col in range(len(crossword_checker.crossword[row])):
                if crossword_checker.check_word(right, row, col):
                    total += 1
                if crossword_checker.check_word(left, row, col):
                    total += 1
                if crossword_checker.check_word(up, row, col):
                    total += 1
                if crossword_checker.check_word(down, row, col):
                    total += 1
                if crossword_checker.check_word(asc_up, row, col):
                    total += 1
                if crossword_checker.check_word(asc_down, row, col):
                    total += 1
                if crossword_checker.check_word(desc_up, row, col):
                    total += 1
                if crossword_checker.check_word(desc_down, row, col):
                    total += 1
    else:
        for row in range(len(crossword_checker.crossword)):
            for col in range(len(crossword_checker.crossword[row])):
                if crossword_checker.check_x(row, col):
                    total += 1

    print(total)
