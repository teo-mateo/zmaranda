
//Euler project, problem 4
//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
//Find the largest palindrome made from the product of two 3-digit numbers.
open System;

let isPalindrome (s:string) = s.Equals(new String(s.ToCharArray() |> Array.rev))
let isPalindromeInt (i:int) = isPalindrome(i.ToString())    

let mutable n = (998001+1) //start with max
let mutable found = false

while not found do
    n <- n-1
    if (isPalindromeInt n) then
        found <- (seq {999..-1..100} |> Seq.exists(fun q -> n%q=0 && (n/q).ToString().Length = 3))

printfn "LARGEST PALINDROME IS %d" (n)

//result: 906609

