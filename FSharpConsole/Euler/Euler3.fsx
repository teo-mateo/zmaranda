
let nextprime (primes:uint64[])=
    let mutable p = primes.[primes.Length-1]
    let lst = List.ofArray primes
    let mutable divisors_cnt = 1
    while divisors_cnt > 0 do
        let p2 = p
        divisors_cnt <- (List.length (List.filter (fun (x:uint64)-> p2%x=0UL) lst))
        p<-p+1UL
    p-1UL


let euler3 :uint64 =
    let mutable number = 600851475143UL;
    let mutable primes = [2UL]
    let mutable prime = List.head primes

    while number > prime do
        while number % prime > 0UL do
            prime <- nextprime (List.toArray primes)
            primes <- primes @ [prime]
        number <- number / prime
    prime

let result = euler3
printfn "%d" result
