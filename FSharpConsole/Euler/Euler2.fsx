let rec fib (x:int) =
    let ret = match x with
        | 1 -> 1
        | 2 -> 2
        | _ -> 
            let y = x-1
            let z = x-2
            (fib y) + (fib z)
    ret

let fib2 limit= 
    let mutable t= (1,1)
    let mutable sum=0
    while snd t < limit do
        let nxt = fst t + snd t
        t <- (snd t, nxt)
        if nxt%2=0 then sum<-sum+nxt

    sum
