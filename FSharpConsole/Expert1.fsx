//tuple
let x = (1,2)

let people = 
    [("Adam", None);
     ("Eve", None);
     ("Cain", Some("Adam", "Eve"));
     ("Abel", Some("Adam", "Eve"))]

let keepPositive (a:int) = if a > 0 then Some(a) else None

open System.Net
open System.IO

let http (url: string) = 
    let req = WebRequest.Create(url)
    let resp = req.GetResponse()
    let stream = resp.GetResponseStream()
    let reader = new StreamReader(stream)
    let html = reader.ReadToEnd()
    resp.Close()
    html


let fetch url = 
    try Some(http url)
    with :? System.Net.WebException -> None

match (fetch "http://www.nature.com") with
    | Some text -> printfn "text = %s" text
    | None -> printfn "**** no web page found"

let theval = 23
let result = 
    match theval with
    | 22 -> true
    | _ -> false


let isLikelySecretAgent url agent =
    match (url, agent) with
    | ("http://www.control.org", 99) -> true
    | ("http://www.control.org", 86) -> true
    | ("http://www.kaos.org", _) -> true
    | _ -> false

isLikelySecretAgent "http://www.kaos.org" 93




let printFirst xs = 
    match xs with
    | h :: t -> printfn "The first item in the list is %A and last is %A" h t
    | [] -> printfn "**** No items in the list"

//let oddPrimes = [1;3;5]
let oddPrimes = []
printFirst oddPrimes