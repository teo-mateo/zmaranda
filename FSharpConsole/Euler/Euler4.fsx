
//Euler project, problem 4
//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
//Find the largest palindrome made from the product of two 3-digit numbers.

open System;
open System.Diagnostics;

let isPalindrome (s:string) = s.Equals(new String(s.ToCharArray() |> Array.rev))
let isPalindromeInt (i:int) = isPalindrome(i.ToString())    

let mutable n = (998001+1) //start with max
let mutable found = false

let sw = new Stopwatch()
sw.Start()


while not found do
    n <- n-1
    if (isPalindromeInt n) then
        found <- (seq {999..-1..100} |> Seq.exists(fun q -> n%q=0 && (n/q).ToString().Length = 3))

sw.Stop();
printfn "LARGEST PALINDROME IS %d" (n)
printfn "Took %d" sw.ElapsedMilliseconds

//result: 906609

//my solution takes 60-70ms 
//below there's a more elegant answer from stackoverflow; 
//it takes 140-170ms.
//I think it's because it is calculating ALL palindromes. 
//I chose to optimize and go from top to bottom.


//open System;
//open System.Diagnostics;
//
//type System.String with
//    member s.Reverse() = String(Array.rev (s.ToCharArray()))
//
//let isPalindrome x = 
//    let s = string x in s = s.Reverse()
//
//let sw = new Stopwatch()
//sw.Start()
//
//
//seq {
//    for i in 100..999 do
//    for j in i..999 -> i*j
//}
//|> Seq.filter isPalindrome
//|> Seq.max
//|> printfn "The answer is %d"
//
//sw.Stop();
//printfn "Took %d" sw.ElapsedMilliseconds