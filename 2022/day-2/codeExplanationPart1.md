## Let

- $\text{Rock} = 0$
- $\text{Paper} = 0$
- $\text{Scissors} = 0$

## Then

Elf Choice | User Choice | Result = (Elf Choice - User Choice) | $\text{Result mod}(3)$
--- | --- | --- | ---
Rock | Rock | $1-1=0$ | $0 \text{ mod}(3) = 0$
Rock | Paper | $1-2=-1$ | $-1 \text{ mod}(3) = 2$
Rock | Scissors | $1-3=-2$ | $-2 \text{ mod}(3) = 1$
Paper | Rock | $2-1=1$ | $1 \text{ mod}(3) = 1$
Paper | Paper | $2-2=0$ | $0 \text{ mod}(3) = 0$
Paper | Scissors | $2-3=-1$ | $-1 \text{ mod}(3) = 2$
Scissors | Rock | $3-1=2$ | $2 \text{ mod}(3) = 2$
Scissors | Paper | $3-2=1$ | $1 \text{ mod}(3) = 1$
Scissors | Scissors | $3-3=0$ | $0 \text{ mod}(3) = 0$

## Note:
- 0 always represents a tie.
- 1 always represents a loss.
- 2 always represents a win.
