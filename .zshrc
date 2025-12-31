
#precmd() { print -n "\033]0;${PWD}\007" }


export EDITOR='nvim'


ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets pattern cursor)

autoload -Uz compinit; compinit

source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /Users/dave/Desktop/completion.zsh.inc

fpath=(~/.zsh/completions $fpath)


source ~/.config/zsh/fzf.zsh
source ~/Desktop/fzf-tab/fzf-tab.plugin.zsh

eval "$(fnm env --use-on-cd --shell zsh)"

autoload -Uz vcs_info
precmd() { vcs_info }
zstyle ':vcs_info:git:*' formats '%F{5}%b%f '
setopt PROMPT_SUBST
PROMPT='%B%F{blue}%~%f%b ${vcs_info_msg_0_}'


eval "$(zoxide init zsh)"


alias python=python3
alias vi=run_neovim
alias ls='eza'
alias lsa='eza -al'
alias lst='eza -T --git-ignore'
alias g=z
# alias gf="fd --type d | fzf --preview 'fzf-preview.sh {}' --bind 'focus:transform-header:file --brief {}'"
alias gs='git status'
alias ga='git add *'
alias gc='git commit -am'
alias a="~/.opencode/bin/opencode"

alias build="/Users/dave/Code/niftybuild_run"

gf() {
  # 1. Use fd to find directories (starting from arg 1, or '.' if no arg)
  # 2. Pipe the list to fzf for selection
  # 3. Store the selected directory in a local variable 'dir'
  local dir

  #dir=$(fd --type d "${1:-.}" | fzf --preview 'fzf-preview.sh {}' --bind 'focus:transform-header:file --brief {}')

  dir=$(fd --type d "${1:-.}" | fzf --style full \
    --border --padding 1,2 \
    --border-label ' Find Folders ' --input-label ' Input ' --header-label ' File Type ' \
    --preview 'tree -C -L 2 {}' \
    --bind 'result:transform-list-label:
        if [[ -z $FZF_QUERY ]]; then
          echo " $FZF_MATCH_COUNT items "
        else
          echo " $FZF_MATCH_COUNT matches for [$FZF_QUERY] "
        fi
        ' \
    --bind 'focus:transform-preview-label:[[ -n {} ]] && printf " Previewing [%s] " {}' \
    --bind 'focus:+transform-header:file --brief {} || echo "No file selected"' \
    --bind 'ctrl-r:change-list-label( Reloading the list )+reload(sleep 2; git ls-files)' \
    --color 'border:#aaaaaa,label:#cccccc' \
    --color 'preview-border:#9999cc,preview-label:#ccccff' \
    --color 'list-border:#669966,list-label:#99cc99' \
    --color 'input-border:#996666,input-label:#ffcccc' \
    --color 'header-border:#6699cc,header-label:#99ccff')

  # 4. Check if 'dir' is not empty (i.e., user selected something)
  if [[ -n "$dir" ]]; then
    # 5. Change to the selected directory.
    #    Quotes are crucial to handle directories with spaces.
    cd "$dir"
  fi
}

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
        *niftyclient*) 
            title="NIFTY CLIENT" 
            ;;
        *niftyserver*) 
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


#gh()        {   print -z $( ([ -n "$ZSH_NAME" ] && fc -l 1 || history) | fzf +s | sed -E 's/ *[0-9]*\*? *//' | sed -E 's/\\/\\\\/g')   }
alias gce='/opt/homebrew/bin/gh copilot explain'
alias gcs='/opt/homebrew/bin/gh copilot suggest'

function GF() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd
	yazi "$@" --cwd-file="$tmp"
	IFS= read -r -d '' cwd < "$tmp"
	[ -n "$cwd" ] && [ "$cwd" != "$PWD" ] && builtin cd -- "$cwd"
	rm -f -- "$tmp"
}

# export NNN_FIFO="/tmp/nnn.fifo" # temporary buffer for the previews
# export NNN_PLUG='p:preview-tui'
#
#
# GF ()
# {
#     if [ -n $NNNLVL ] && [ "${NNNLVL:-0}" -ge 1 ]; then
#         echo "nnn is already running"
#         return
#     fi
#
#     export NNN_TMPFILE="${XDG_CONFIG_HOME:-$HOME/.config}/nnn/.lastd"
#
#     nnn "$@"
#
#     if [ -f "$NNN_TMPFILE" ]; then
#             . "$NNN_TMPFILE"
#             rm -f "$NNN_TMPFILE" > /dev/null
#     fi
# }


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



# DISABLE_AUTO_TITLE="true"



# opencode
export PATH=/Users/dave/.opencode/bin:$PATH

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion







# for command completion in ${(kv)_comps:#-*(-|-,*)}; do \
#   printf "%-32s %s\n" $command $completion; \
# done | sort


