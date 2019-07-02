# Problem Solving - Poppin Bottles

A stretch activity from Lighthouse Labs (w01d5)

## Purpose

**_BEWARE:_ This library was published for learning purposes. It is _not_ intended for use in production-grade software.**

This project was created and published by me as part of my learnings at Lighthouse Labs.

In this exercise, we intend to build a function to help a grocery chain that put in place a recycling program. In order to help keep track of the recycling program, our function needs to take the following into consideration:

* For every two empty bottles, you get a free bottle (full)
* For every four bottle caps, you get a free bottle (full)
* Each bottle (full) costs $2 to purchase

The function should be called from the command line with the amount of money initially put towards buying bottles.

Once ran, the function should print a summary of the transaction:
```
TOTAL BOTTLES: 23
REMAINING BOTTLES: 1
REMAINING CAPS: 3
TOTAL EARNED:
  BOTTLES: 11
  CAPS: 5
```

## Usage

**Call it:**

`npm poppinBottles.js <number>`

  example:
```
> npm poppinBottles.js 15
TOTAL BOTTLES: 23
REMAINING BOTTLES: 1
REMAINING CAPS: 3
TOTAL EARNED:
  BOTTLES: 11
  CAPS: 5
```