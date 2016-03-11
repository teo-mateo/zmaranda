let rec fib (x:int) =
    let ret = match x with
        | 1 -> 1
        | 2 -> 2
        | n -> (fib n-1) + (fib n-2)
    ret

let fib2 limit= 
    let mutable t= (1,1)
    let mutable sum=0
    while snd t < limit do
        let nxt = fst t + snd t
        t <- (snd t, nxt)
        if nxt%2=0 then sum<-sum+nxt

    sum

fib2 1000000