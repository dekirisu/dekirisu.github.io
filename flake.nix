{
  description = "Portfolio site — Card & Overview Website 🦊";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
      inherit system;
      config = {
        allowUnfree = true;
      };
    };
  in {
    devShells.${system}.default = pkgs.mkShell {
      name = "portfolio";
      packages = with pkgs; [
        nodejs_22
        pngquant
      ];

      shellHook = ''
        echo "🦊 Portfolio dev shell"
        echo "  Node:   $(node --version)"
        echo "  NPM:    $(npm --version)"
        echo ""
        echo "  npm install   — install dependencies"
        echo "  npm start     — dev server on :5173"
        echo "  npm run build — static build"
      '';
    };
  };
}
