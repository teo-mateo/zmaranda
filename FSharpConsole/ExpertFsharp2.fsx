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
let getStats site = 
    let url = "http://" + site
    let html = http url
    let hwords = html |> getWords
    let hrefs = html |> getWords |> Array.filter (fun s -> s = "href")

    (site, html.Length, hwords.Length, hrefs.Length)

let sites = ["bing.com"; "google.com"; "search.yahoo.com"]

List.map getStats sites
//alternative syntax
//sites |> List.map getStats