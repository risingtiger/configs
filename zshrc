
#precmd() { print -n "\033]0;${PWD}\007" }


export EDITOR='nvim'

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
_fzf_compgen_path() {   fd --hidden --follow --exclude ".git" . "$1"   }
_fzf_compgen_dir() {   fd --type d --hidden --follow --exclude ".git" . "$1"   }
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'


ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets pattern cursor)
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh


autoload -Uz vcs_info
precmd() { vcs_info }
zstyle ':vcs_info:git:*' formats '%F{5}%b%f '
setopt PROMPT_SUBST
PROMPT='%B%F{blue}%~%f%b ${vcs_info_msg_0_}'


eval "$(zoxide init zsh)"
eval "$(fnm env --use-on-cd)"


alias python=python3
alias vi=run_neovim
alias ls='eza'
alias lsa='eza -al'
alias lst='eza -T --git-ignore'
alias g=z
alias gh=zi
alias GA="~/Code/aider/aider_run"

alias build="/Users/dave/Code/nifty/builditsrc/run_buildit"


run_neovim() {
    local title 

    case "$PWD" in
        *pwtclient*)    
            title="PWT CLIENT" 
            ;; # Semicolons terminate each case branch
        *xenclient*)    
            title="XEN CLIENT" 
            ;;
        *pwtserver*)    
            title="PWT SERVER" 
            ;;
        *xenserver*)    
            title="XEN SERVER" 
            ;;
        *nifty/client*) 
            title="NIFTY CLIENT" 
            ;;
        *nifty/server*) 
            title="NIFTY SERVER" 
            ;;
        *nifty) 
            title="NIFTY" 
            ;;
        *)              
            title="$PWD" 
            ;; 
    esac 

    print -n "\033]0;${title}\007"

    command nvim "$@"
}


gb()        {   print -z $( ([ -n "$ZSH_NAME" ] && fc -l 1 || history) | fzf +s | sed -E 's/ *[0-9]*\*? *//' | sed -E 's/\\/\\\\/g')   }
alias gce='/opt/homebrew/bin/gh copilot explain'
alias gcs='/opt/homebrew/bin/gh copilot suggest'

export NNN_PLUG='p:preview-tui'

GH ()
{
    if [ -n $NNNLVL ] && [ "${NNNLVL:-0}" -ge 1 ]; then
        echo "nnn is already running"
        return
    fi

    export NNN_TMPFILE="${XDG_CONFIG_HOME:-$HOME/.config}/nnn/.lastd"

    nnn "$@"

    if [ -f "$NNN_TMPFILE" ]; then
            . "$NNN_TMPFILE"
            rm -f "$NNN_TMPFILE" > /dev/null
    fi
}


findancestoryfile () {
  if [ -f "$1" ]; then
    printf '%s\n' "${PWD%/}/$1"
  elif [ "$PWD" = / ]; then
    false
  else
    # a subshell so that we don't affect the caller's $PWD
    (cd .. && findancestoryfile "$1")
  fi
}




source /Users/dave/.config/broot/launcher/bash/br

alias GHH=br



. "$HOME/.local/bin/env"



DISABLE_AUTO_TITLE="true"


