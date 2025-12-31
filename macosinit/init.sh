#!/bin/bash 


cd ~/Desktop


mkdir -p ~/.config


# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install UV for python management
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install FNM for Node.js management
curl -fsSL https://fnm.vercel.app/install | bash

# Install Bun 
curl -fsSL https://bun.sh/install | bash
