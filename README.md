# Post the Meme, Win the Feed — make.fun entry

[![make.fun · u-myronera-post-the-meme-win-the-feed-2de960bf](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?utm_source=github&utm_medium=readme&utm_campaign=u-myronera-post-the-meme-win-the-feed-2de960bf)
[![rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/kreutzx/makefun-meme-feed-entry/rank.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/kreutzx/makefun-meme-feed-entry/reward.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)

This repository is the entry for the make.fun bounty
**"Post the Meme, Win the Feed"** (`u-myronera-post-the-meme-win-the-feed-2de960bf`),
sponsored by myronera. The bounty asks for a meme posted to X that wins the
feed; the creative work itself — the meme picture and the post — lives on X.
This repo is the delivery mechanism that hands the post's URL to the
make.fun runner.

## How it works

- `POST.json` holds a single field, `url`, pointing at the X post that
  carries the meme.
- `main.ts` (Node 22, TypeScript, standard library only) reads `POST.json`
  from beside itself and writes its exact bytes into the output directory
  named by the `MAKEFUN_OUTPUT_DIR` environment variable (default
  `/output`), creating that directory if needed. After writing, it reads
  the file back and asserts the bytes are identical, so a corrupted copy
  fails loudly instead of shipping.

## Run it locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
# -> /tmp/out/POST.json, byte-identical to ./POST.json
```

## License

MIT — see `LICENSE`.
