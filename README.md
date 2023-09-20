# Lottery Keeper

## Project description

### Specifications:

    - You need to guess 5 numbers, ranging from 1 to 39.
    - Prizes are awarded for 2, 3, 4, and 5 correct guesses.
    - The cost of one game is 500 credits.
    - It should be usable both as a Player and an Operator.

    The Player:
        - Can assign a name to themselves.
        - Starts with a balance of 10,000 credits.
        - Should not lose their name and balance when returning to play after
        several days.
        - Can purchase as many tickets as they can afford.
        - Can view their submitted tickets in the order of their guesses,
         and this list should not be sortable.
        - Can check how many correct guesses they had and the corresponding
        payout after the drawing.
        - The list should be sortable based on the number of correct guesses.
        - The list should include a summary row showing all their winnings.

    The Operator:
        - Starts with a balance of 0 credits.
        - Should not lose their balance when returning to operate after several days.
        - Can simulate additional Players as follows:
            - Specify a number (X) for how many tickets to generate for the game.
            - Generate X tickets, each with 5 random numbers.
            - The price of these tickets should be added to the Operator's balance.
        - Can view all submitted tickets in a list.
        - Player tickets should appear at the beginning of the list, and it should be
        clear if a ticket was generated or submitted by a Player.
        - The list should not be sortable.
        - Can initiate the drawing, during which:
            - The game generates 5 random numbers.
            - The Player's winnings are added to their balance.
            - The total payout for winnings is deducted from the Operator's balance.
        - A report should display the results:
            - Number of tickets with 5, 4, 3, 2 correct guesses, and the number of
            losing tickets.
            - Payout per correct guess for each ticket.
            - Total payout for each level of correct guesses.
            - Total number of tickets.
            - Total revenue from all tickets.
            - Total payout for all correct guesses.
            - Operator's profit.
        - The previously described list should expand to show:
            - Number of correct guesses.
            - Payout per ticket.
            - Should be sortable by any column.
        - Can start a new round, resetting everything to the initial game state,
        except for the Player's and Operator's balances.
        - Can start a new game, resetting everything to the initial game state.

### Additional Information:

    - You have the discretion to decide the payout calculation for
    winning tickets, with the primary goal of ensuring that the Operator
    is profitable after each draw.
    - No authentication is required; both Players and Operators should be
    able to use the platform without issues.

    Important:
    - Since we are looking for a React developer, feel free to use the techniques
    you find suitable.
    - If you believe there is information missing, please make decisions accordingly.
    Document any such decisions, why you made them, and make the list of decisions
    available somewhere in the interface.
    - Hosting the game is your responsibility.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
