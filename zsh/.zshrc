

alias python=/usr/local/Cellar/python@3.9/3.9.0_1/bin/python3.9
alias pip=/usr/local/bin/pip3
alias ff='vifm ./'
alias tl='tmux ls'
alias tn='tmux new -s'
alias ta='tmux ls && echo -n "Enter TmuxName: " && read TmuxName && tmux attach -t $TmuxName'
alias vi=/usr/local/bin/nvim
h() {   print -z $( ([ -n "$ZSH_NAME" ] && fc -l 1 || history) | fzf +s --tac --height "50%" | sed -E 's/ *[0-9]*\*? *//' | sed -E 's/\\/\\\\/g')   }
D() {   print -z $( (fd --type directory . ~/) | fzf --tac --height "50%" )  } 




export ZSH="/Users/xenition/.oh-my-zsh"

# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)

source $ZSH/oh-my-zsh.sh

if [[ -n $SSH_CONNECTION ]]; then
 export EDITOR='nvim'
else
 export EDITOR='nvim'
fi




[ -f ~/.fzf.zsh  ] && source ~/.fzf.zsh
export FZF_DEFAULT_OPS="--extended"

export FZF_COMPLETION_TRIGGER='fd --type file '
export FZF_DEFAULT_COMMAND='fd --type file '
export FZF_ALT_C_COMMAND="fd --type directory "

export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

export FZF_COMPLETION_TRIGGER='ff'

export FZF_COMPLETION_OPTS='+c -x'

_fzf_compgen_path() {
  fd --follow --exclude ".git" . "$1"
}

_fzf_compgen_dir() {
  fd --type d --follow --exclude ".git" . "$1"
}

