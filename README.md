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

## Questions at the start:

    * 1. How much is the payout for the winner games?
    We need to keep the Operator profitable, so we keep 100 credits after each games
    for the Operator. We will give back 400 credits to the winners after each game. Games,
    with 5 correct guesses are more valuable than games with 4 correct guesses and happen
    less often, so these should be worth more, etc. We are going to devide the amout, which
    is going to be given back to the winners, according to the number of winning games with
    the specific number of correct guesses and the probability of occurance of these number
    of right guesses in each game.

    * 2. Where should we save the state of the game?
    The game does not require any user authentication, so the simplest solution is just saving
    everything in the local storage. This has an advantage and a disadvantage too. The advantage is
    that we can use the local storage of the browser, so no server side code required. The
    disadvantage is that the Operator and Player should play in the same browser on the same device.
    I will choose local storage, because it is a React developer position, so the main focus should
    not be on my server side programming knowledge. I can assure you that I could go on the other way
    with user authentication too, if the given time was longer.

    * 3. How well should be the game logic separated from the UI logic?
    I start with keeping the game logic within the React components and if I had time I could refactor
    the code to separate the game logic. Redux could be a great help here, but the time is short enough
    to tolerate some level of prop drilling and less separation of concerns, so I will go on the easier
    way as a start then I can refactor if I have time.

    As I proceed it seems to be better to separate the game logic from the UI better. In this case it is
    not going to be OOP, because React has a different data driven code organization style, which is against
    OOP encapsulation. The best solution would be to include Redux to decouple the state from the App
    component. In that case, we could use OOP game logic with encapsulation and Redux could update the state
    for us for the UI. It sounds great but it would slow me down, so I choose different way, which is better
    for the size of the problem.

    I create a game logic module with functions, which get the state object and operate on that. The public
    functions of this module will be called from the UI, when it is necessary and the UI reflects the state
    changes. Maybe later we can separate this module for three different ones, which contain the functions for
    the player and the operator respectively and for the commonly used ones.

## Questions during development

    * 1. Shall I write a custom widget, which looks like a lottery ticket?
    I like this idea, because it can look really good and usable well. The main issue is accessibility. To make
    it accessible and test it acoordingly takes long time, so I instead choose a form with validation. It is
    much simpler and accessible out of the box. The only disadvantage is that it looks not so well. The given
    timeframe is short and accessibility and usability of the UI is more important than the look, so I choose
    this solution.

## What are those things, which I would have done if I had a little more time?

    * 1. Some of the data in the draw report should be in the form of a table, because these values depend on
    the number of hits. The user should be able to sort this data according any row or column depending on
    the orientation of the table.

    * 2. I planned to add a footer with a little animation.

    * 3. The responsive design needs to be fine tuned with some media queries and a little CSS. It should be
    working for upto 400% zoom and large font sizes. We should be able to go down to 300px x 250px viewport
    sizes without any problem even with 400% zoom or 200% zoom and 32px base font-size. It takes time and I
    run out of time, so this work is missing. This is requirement for complying with the WCAG AA standard too.

    * 4. I planned to add some tests with Jest, especially for the game logic. Although I did manual test on
    everything, automated tests has their advantages. We could just trust the calculations much better if I
    had those tests. Unfortunately that takes time too. The math is well thought over and this task provides
    a lot of places to check on the numerical results. I tried to use chatGPT to calculate the numerical
    values of the probabilities. Do not do it. I asked it 5 times, pointing out, that the results are very bad.
    Even after long conversation it was unable to give me probabilities, which add up to one. Probabilities
    should add up to one always, if you take into account all the possibilities. It is an opportunity to check
    numerical results. The problem has a lot of points like this, but tests would be the best.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
