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

let delimiters = [|' '; '\n'; '\t'; '<'; '>'; '='|]
let getWords (s:string) = s.Split delimiters

let google = http "http://google.com"

//google |> getWords |> Array.filter (fun s-> s="href") |> Array.length
let countLinks = getWords >> Array.filter(fun s-> s="href") >> Array.length
google |> countLinks