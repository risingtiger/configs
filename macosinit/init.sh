#!/bin/bash 


cd ~/Desktop


mkdir -p ~/.config


# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH for this session
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install UV for python management
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install FNM for Node.js management
curl -fsSL https://fnm.vercel.app/install | bash

# Add FNM to PATH for this session
export PATH="$HOME/.local/share/fnm:$PATH"
eval "$(fnm env)"

# Install Bun 
curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH for this session
export PATH="$HOME/.bun/bin:$PATH"
