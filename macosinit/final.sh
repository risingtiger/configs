#!/bin/bash 


fnm install 20

$(brew --prefix)/opt/fzf/install


npm install --global particle-cli
npm install --global @swc/cli
npm install --global @swc/core

cp -r ~/Desktop/ssh ~/.ssh
cp -r ~/Desktop/configs/ghostty ~/.config/ghostty
cp -r ~/Desktop/configs/karabiner ~/.config/karabiner
cp -r ~/Desktop/configs/nnn ~/.config/nnn
cp -r ~/Desktop/configs/nvim ~/.config/nvim
cp -r ~/Desktop/configs/RectangleProConfig ~/.config/RectangleProConfig
cp -r ~/Desktop/configs/ignore ~/.ignore
cp -r ~/Desktop/configs/gitconfig ~/.gitconfig
cp -r ~/Desktop/configs/zprofile ~/.zprofile
cp -r ~/Desktop/configs/zshrc ~/.zshrc
cp -r ~/Desktop/configs/aider.conf.yml ~/.aider.conf.yml

sh -c "$(curl -Ls https://raw.githubusercontent.com/jarun/nnn/master/plugins/getplugs)"

python -m pip install aider-install
aider-install
