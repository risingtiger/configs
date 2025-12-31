#!/bin/bash 


fnm install 24
fnm use 24

$(brew --prefix)/opt/fzf/install

curl -fsSL https://opencode.ai/install | bash

npm install --g particle-cli
npm install --g typescript

cp -r ~/Desktop/ssh ~/.ssh
cp -r ~/Desktop/zprofile ~/.zprofile

cp -r ~/Desktop/configs/.configs/ghostty ~/Desktop/configs/.configs/karabiner ~/Desktop/configs/.configs/nvim ~/Desktop/configs/.configs/opencode ~/.configs/.

cp -r ~/Desktop/configs/.gitconfig ~/Desktop/configs/.gitignore ~/Desktop/configs/.ignore ~/Desktop/configs/.nifty ~/Desktop/configs/.zsh ~/Desktop/configs/.zshrc ~/.

