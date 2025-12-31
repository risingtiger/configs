#!/bin/bash 


fnm install 24

$(brew --prefix)/opt/fzf/install


npm install --g particle-cli
npm install --g typescript

cp -r ~/Desktop/ssh ~/.ssh
cp -r ~/Desktop/zprofile ~/.zprofile

cp -r ~/Desktop/configs/ghostty ~/Desktop/configs/karabiner ~/Desktop/configs/nvim ~/Desktop/configs/opencode ~/.

cp -r ~/Desktop/configs/.fzf.bash ~/Desktop/configs/.gitconfig ~/Desktop/configs/.gitignore ~/Desktop/configs/.ignore ~/Desktop/configs/.nifty  ~/Desktop/configs/.zshrc ~/.

sh -c "$(curl -Ls https://raw.githubusercontent.com/jarun/nnn/master/plugins/getplugs)"

